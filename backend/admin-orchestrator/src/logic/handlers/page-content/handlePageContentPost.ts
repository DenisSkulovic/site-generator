import {PageContentRepository} from "@repository_module"
import {PageContent, buildPageContent} from "@page_cls_module"
import {type APIGatewayEvent} from "aws-lambda"

const handlePageContentPost = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<void> => {
    const body = JSON.parse(event.body || "{}")
    const item: PageContent = buildPageContent(body)
    const repo = new PageContentRepository()
    await repo.putItem(item)
}

export default handlePageContentPost