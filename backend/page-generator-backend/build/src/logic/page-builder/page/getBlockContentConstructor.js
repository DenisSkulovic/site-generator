"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const blockContentsArr_1 = __importDefault(require("../../../config/blockContentsArr"));
const getBlockContentConstructor = (template) => {
    // for e.g., template is TEXT, and the arr contains a class named BlockContent_TEXT, so it will find it
    return blockContentsArr_1.default.find((blockContentConstructor) => {
        return blockContentConstructor.name.endsWith(template);
    });
};
exports.default = getBlockContentConstructor;
//# sourceMappingURL=getBlockContentConstructor.js.map