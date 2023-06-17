"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AreaContent = exports.buildAreaContent = void 0;
const __1 = require("../../../");
const BlockContent_1 = require("./BlockContent");
const buildAreaContent = (obj) => {
    const uuid = obj.uuid;
    if (!uuid)
        throw new Error('uuid cannoe be undefined');
    if (obj.clazz !== "AreaContent")
        throw new Error("clazz cannot be anything other than 'AreaContent'");
    const data = {};
    const rawData = obj.data;
    Object.entries(rawData).forEach((entry) => {
        const configId = entry[0];
        const rawContent = entry[1];
        console.log(`rawContent`, rawContent);
        if (!rawContent.clazz)
            throw new Error("objects must have a 'clazz' value");
        if (rawContent.clazz === "AreaContent") {
            const areaContent = (0, exports.buildAreaContent)(rawContent);
            data[configId] = areaContent;
        }
        else if (rawContent.clazz === "BlockContent") {
            const blockContent = (0, BlockContent_1.buildBlockContent)(rawContent);
            data[configId] = blockContent;
        }
        else {
            throw new Error("cannot process content of clazz: " + rawContent.clazz);
        }
    });
    const metadata = new __1.BlockContentMetadata(obj.createdTimestamp, obj.updatedTimestamp);
    const areaContent = new AreaContent(uuid, data, metadata);
    return areaContent;
};
exports.buildAreaContent = buildAreaContent;
class AreaContent {
    constructor(uuid, data, metadata) {
        this.uuid = uuid;
        this.data = data;
        this.metadata = metadata;
        this.clazz = this.constructor.name;
    }
}
exports.AreaContent = AreaContent;
//# sourceMappingURL=AreaContent.js.map