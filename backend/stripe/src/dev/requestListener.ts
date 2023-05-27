import {mapIncomingMessageToAPIGatewayEvent, mapIncomingMessageToContext} from "./mapIncomingMessageToAPIGatewayEventV2"
import * as http from "node:http";
import {
    APIGatewayProxyEvent,
    APIGatewayProxyResult,
    Context,
} from "aws-lambda";
import {handler} from ".."


const requestListener = async function (req: http.IncomingMessage, res: http.ServerResponse) {
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS, POST, GET, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader('Access-Control-Max-Age', 2592000); // 30 days
    
    let body: string = '';
    req.on("data", async (chunk: string) => {
        body = chunk;
    });
    req.on("end", async () => {

        if (req.method === "OPTIONS") {
            console.log(`returning OPTIONS response`)
            res.writeHead(204, {
                "Content-Type": "application/json",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
            });
            res.end();
            return
        }

        try {
            const event: APIGatewayProxyEvent = mapIncomingMessageToAPIGatewayEvent(req, body);
            const context: Context = mapIncomingMessageToContext(req)
            let response: APIGatewayProxyResult = await handler(event, context)
            res.writeHead(response.statusCode);
            res.end(response.body);
        } catch (err) {
            console.error(`requestListener ERROR:>> `, err)
            res.writeHead(500);
            res.end({
                message: "ERROR"
            });
        }
    })
};

export default requestListener