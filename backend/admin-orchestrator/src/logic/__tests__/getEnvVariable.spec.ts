// @ts-nocheck
// Import the function and any other necessary dependencies
import getEnvVariable from '../getEnvVariable'

// Test suite
describe('getEnvVariable', () => {

    // Test case 1
    it('should return the value of a defined environment variable', () => {
        process.env.MY_VARIABLE = 'abc123'
        const variableValue = getEnvVariable('MY_VARIABLE')
        expect(variableValue).toEqual('abc123')
    })

    // Test case 2
    it('should throw an error for an undefined environment variable', () => {
        process.env.MY_VARIABLE_2 = undefined
        expect(() => getEnvVariable('MY_VARIABLE_2')).toThrow('MY_VARIABLE_2 is a mandatory env param')
    })

})
