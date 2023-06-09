import handleError from "../handleError"
import Response from "../../classes/Response"

describe('handleError', () => {
    it('should return a 400 response for TypeError or SyntaxError', async () => {
        const error = new TypeError('This is a TypeError')

        const response = await handleError(error)

        expect(response).toBeInstanceOf(Response)
        expect(response.statusCode).toBe(400)
        expect(response.body).toBe(JSON.stringify({ message: error.message }))
    })

    it('should return a 500 response for other errors', async () => {
        const error = new Error('This is a general error')

        const response = await handleError(error)

        expect(response).toBeInstanceOf(Response)
        expect(response.statusCode).toBe(500)
        expect(response.body).toBe(JSON.stringify({ message: error.message }))
    })
})