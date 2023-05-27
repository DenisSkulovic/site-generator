import { BlockContent, BlockContentMetadata } from "../../../";

export class BlockContent_TEXT extends BlockContent {
    
    constructor(
        uuid: string,
        data: {
            text: string,
        },
        metadata: BlockContentMetadata,
    ) {
        super(uuid, data, metadata)
        this.clazz = this.constructor.name
    }
}