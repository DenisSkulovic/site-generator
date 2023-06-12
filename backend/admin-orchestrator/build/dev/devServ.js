"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const http = __importStar(require("node:http"));
const requestListener_1 = __importDefault(require("./requestListener"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const host = "localhost";
const port = process.env.PORT;
if (!port)
    throw new Error("cannot start the dev server without the PORT env param");
const port = port;
const createDevServer = () => {
    const server = http.createServer(requestListener_1.default);
    server.listen(port, host, () => {
        console.log(`Server is running on http://${host}:${port}`);
    });
    return server;
};
exports.default = createDevServer;
//# sourceMappingURL=devServ.js.map