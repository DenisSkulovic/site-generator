"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const logger = (text) => {
    if (process.env.ENV === "test") {
        fs_1.default.appendFile('logs.txt', text + '\n', (err) => {
            if (err)
                throw err;
        });
    }
    else {
        console.log(text);
    }
    ;
};
exports.default = logger;
//# sourceMappingURL=logger.js.map