// @ts-nocheck
import getDistributionId from "../getDistributionId"

describe('getDistributionId function', () => {
    afterEach(() => {
        jest.clearAllMocks()
        process.env = {}
    })

    it('should return DISTRIBUTION_ID_PROD from the environment if env is prod', () => {
        const env = 'prod'
        const expectedId = 'abc123'
        process.env.DISTRIBUTION_ID_PROD = expectedId

        const actualId = getDistributionId(env)

        expect(actualId).toEqual(expectedId)
        expect(process.env.DISTRIBUTION_ID_PROD).toEqual(expectedId)
        expect(process.env.DISTRIBUTION_ID_DEV).toBeUndefined()
    })

    it('should return DISTRIBUTION_ID_DEV from the environment if env is dev', () => {
        const env = 'dev'
        const expectedId = 'def456'
        process.env.DISTRIBUTION_ID_DEV = expectedId

        const actualId = getDistributionId(env)

        expect(actualId).toEqual(expectedId)
        expect(process.env.DISTRIBUTION_ID_DEV).toEqual(expectedId)
        expect(process.env.DISTRIBUTION_ID_PROD).toBeUndefined()
    })

    it('should throw an error if DISTRIBUTION_ID_PROD is not set and env is prod', () => {
        const env = 'prod'

        expect(() => getDistributionId(env)).toThrow('DISTRIBUTION_ID_PROD is a mandatory env param')
    })

    it('should throw an error if DISTRIBUTION_ID_DEV is not set and env is dev', () => {
        const env = 'dev'

        expect(() => getDistributionId(env)).toThrow('DISTRIBUTION_ID_DEV is a mandatory env param')
    })
})
