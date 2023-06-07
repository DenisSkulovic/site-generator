import { PageHTMLRepository } from "@repository_module"
import type {PageHTMLObject} from "@page_cls_module"
import {type APIGatewayEvent} from "aws-lambda"

const handlePageHTMLObjectGetAll = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<PageHTMLObject> => {
    const repo = new PageHTMLRepository()
    const item = await repo.getAllItems()
    return item
}

export default handlePageHTMLObjectGetAll