import { PageHTMLRepository } from "@repository_module"
import type {PageHTMLObject} from "@page_cls_module"
import {type APIGatewayEvent} from "aws-lambda"

const handlePageHTMLObjectGet = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<PageHTMLObject> => {
    const key: string = event.pathParameters.key
    if (!key) throw new Error("key is a mandatory query string param")
    const repo = new PageHTMLRepository()
    const item = await repo.getItem(key)
    return item
}

export default handlePageHTMLObjectGet