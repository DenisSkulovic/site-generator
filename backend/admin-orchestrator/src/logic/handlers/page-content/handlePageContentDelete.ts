import {PageContentRepository} from "@repository_module"
import {type APIGatewayEvent} from "aws-lambda"

const handlePageContentDelete = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<void> => {
    const key: string = event.pathParameters.key
    if (!key) throw new Error("key is a mandatory path param")
    const repo = new PageContentRepository()
    await repo.deleteItem(key)
}

export default handlePageContentDelete