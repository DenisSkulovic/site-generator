import { BlockContent } from "../../../";
export class BlockContent_TEXT extends BlockContent {
    constructor(uuid, data, metadata) {
        super(uuid, data, metadata);
        this.clazz = this.constructor.name;
    }
}
//# sourceMappingURL=BlockContent_TEXT.js.map