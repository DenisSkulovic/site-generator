import {PageHTMLRepository} from "@repository_module"
import { PageHTMLObject, buildPageHTMLObject } from "../../../../../../page_cls_module/src"
import {type APIGatewayEvent} from "aws-lambda"

const handlePageHTMLObjectPost = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<void> => {
    const body = JSON.parse(event.body || "{}")
    const pageHTMLObject: PageHTMLObject = buildPageHTMLObject(body)
    const key: string = event.queryStringParams.key
    if (!key) throw new Error("key is a mandatory query string param")
    const repo = new PageHTMLRepository()
    await repo.putItem(key, pageHTMLObject)
}

export default handlePageHTMLObjectPost