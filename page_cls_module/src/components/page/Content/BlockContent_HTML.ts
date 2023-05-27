import { BlockContent, BlockContentMetadata } from "../../../";

export class BlockContent_HTML extends BlockContent {
    
    constructor(
        uuid: string,
        data: {
            html: string,
        },
        metadata: BlockContentMetadata,
    ) {
        super(uuid, data, metadata)
        this.clazz = this.constructor.name
    }
}