import { APIGatewayEvent } from "aws-lambda";
import { PageVersion } from "../../../../../../page_cls_module/src";
import { PageVersionRepository } from "../../../../../repository_module/src";
import { buildPageVersion } from "../../../../../../page_cls_module/src/components/page/version/PageVersion";

export const handlePageVersionsForPageGet = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<PageVersion[]> => {
    const pagePath = event.queryStringParameters?.pagePath;

    if (!pagePath) {
        throw new Error("pagePath is a mandatory query string param");
    }

    const repo = new PageVersionRepository();
    
    const pageVersions = await repo.getPageVersionsForPagePath(pagePath);

    return pageVersions;
}

export const handlePageVersionGet = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<PageVersion> => {
    const tag = event.queryStringParameters?.tag;
    const pagePath = event.queryStringParameters?.pagePath;

    if (!tag) {
        throw new Error("tag is a mandatory query string param");
    }
    if (!pagePath) {
        throw new Error("pagePath is a mandatory query string param");
    }

    const repo = new PageVersionRepository();
    
    const pageVersion = await repo.getPageVersion(tag, pagePath);

    if (!pageVersion) {
        throw new Error(`No page version found for tag: ${tag}`);
    }

    return pageVersion;
}

export const handlePageVersionPost = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<void> => {
    const body = JSON.parse(event.body || "{}");
    const pageVersion = buildPageVersion(body);

    const repo = new PageVersionRepository();

    await repo.putItem(pageVersion);
};

export const handlePageVersionTagExists = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<boolean> => {
    const tag = event.queryStringParameters?.tag;
    const pagePath = event.queryStringParameters?.pagePath;

    if (!tag) {
        throw new Error("tag is a mandatory query string param");
    }
    if (!pagePath) {
        throw new Error("pagePath is a mandatory query string param");
    }

    const repo = new PageVersionRepository();
    
    const pageVersion = await repo.getPageVersion(tag, pagePath);

    return !!pageVersion;
};