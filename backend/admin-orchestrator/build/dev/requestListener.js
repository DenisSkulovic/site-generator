"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mapIncomingMessageToAPIGatewayEventV2_1 = require("./mapIncomingMessageToAPIGatewayEventV2");
const __1 = require("..");
const requestListener = async function (req, res) {
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS, POST, GET, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader('Access-Control-Max-Age', 2592000); // 30 days
    let body = '';
    req.on("data", async (chunk) => {
        body = chunk;
    });
    req.on("end", async () => {
        if (req.method === "OPTIONS") {
            console.log(`returning OPTIONS response`);
            res.writeHead(204, {
                "Content-Type": "application/json",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
            });
            res.end();
            return;
        }
        try {
            const event = (0, mapIncomingMessageToAPIGatewayEventV2_1.mapIncomingMessageToAPIGatewayEvent)(req, body);
            const context = (0, mapIncomingMessageToAPIGatewayEventV2_1.mapIncomingMessageToContext)(req);
            let response = await (0, __1.handler)(event, context);
            res.writeHead(response.statusCode);
            res.end(response.body);
        }
        catch (err) {
            console.error(`requestListener ERROR:>> `, err);
            res.writeHead(500);
            res.end({
                message: "ERROR"
            });
        }
    });
};
exports.default = requestListener;
//# sourceMappingURL=requestListener.js.map