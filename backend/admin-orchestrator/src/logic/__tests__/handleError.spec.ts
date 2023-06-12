// @ts-nocheck
import handleError from '../handleError';
import Response from '../../classes/Response';

describe('handleError function', () => {
    const mockError = new Error('Test error');
    const errResponse = new Response(500, JSON.stringify({ message: 'Internal Server Error' }));
    const typeError = new TypeError('Test type error');
    const syntaxError = new SyntaxError('Test syntax error');
    const badErrResponse = new Response(400, JSON.stringify({ message: typeError.message }));

    it('should return an instance of Response with status code 500 and message "Internal Server Error" for any error', async () => {
        const response = await handleError(mockError);
        expect(response).toEqual(errResponse);
    });

    it('should return an instance of Response with status code 400 and the message for any type or syntax errors', async () => {
        const typeErrorResponse = await handleError(typeError);
        expect(typeErrorResponse).toEqual(badErrResponse);

        const syntaxErrorResponse = await handleError(syntaxError);
        expect(syntaxErrorResponse).toEqual(badErrResponse);
    });
});
