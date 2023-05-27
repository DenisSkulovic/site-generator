import { BlockContent, BlockContentMetadata } from "../../../";

export class BlockContent_IMAGE extends BlockContent {
    
    constructor(
        uuid: string,
        data: {
            imgSrc: string,
            imgAlt: string,
        },
        metadata: BlockContentMetadata,
    ) {
        super(uuid, data, metadata)
        this.clazz = this.constructor.name
    }
}