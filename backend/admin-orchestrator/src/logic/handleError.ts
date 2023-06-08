import { APIGatewayProxyResult } from "aws-lambda";
import Response from "../classes/Response";

const handleError = async (err: Error): Promise<APIGatewayProxyResult> => {
    console.error("Error:", err);

    let statusCode = 500;
    let message = "Internal Server Error";

    if (err instanceof TypeError || err instanceof SyntaxError) {
        statusCode = 400;
        message = err.message;
    }

    const responseBody = JSON.stringify({ message });

    return new Response(statusCode, responseBody);
};

export default handleError;
