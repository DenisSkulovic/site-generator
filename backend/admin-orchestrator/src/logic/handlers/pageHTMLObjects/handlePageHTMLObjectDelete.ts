import {PageHTMLRepository} from "@repository_module"
import {type APIGatewayEvent} from "aws-lambda"

const handlePageHTMLObjectDelete = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<void> => {
    const key: string = event.pathParameters.key
    if (!key) throw new Error("key is a mandatory query string param")
    const repo = new PageHTMLRepository()
    await repo.deleteItem(key)
}

export default handlePageHTMLObjectDelete