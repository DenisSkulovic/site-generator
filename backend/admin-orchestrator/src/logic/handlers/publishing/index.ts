import { APIGatewayEvent } from "aws-lambda";
import { Pagemeta, buildPagemeta } from "../../../../../../admin_cls_module";
import { GeneratePageResponse, LangEnum, PageConfig, PageContent, PageVersion, buildGeneratePageRequest, buildPageConfig, buildPageContent, buildPageVersion } from "../../../../../../page_cls_module";
import { PageConfigRepository, PageContentRepository, PageVersionRepository } from "../../../../../repository_module";
import { getRepoConstructor } from "../pagemetas";
import { PageGenerator } from "@/generator/PageGenerator";
import { S3Operations } from "../../../../../s3_module/src";
import getEnvVariable from "@/logic/getEnvVariable";

export const handlePublishPage = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<Pagemeta> => {
    // extract query params
    const pagePath = event.queryStringParameters?.pagePath
    const versionTag = event.queryStringParameters?.versionTag
    const lang: string | undefined = event.queryStringParameters?.lang;
    if (!pagePath) throw new Error("pagePath is a mandatory query string param");
    if (!versionTag) throw new Error("versionTag is a mandatory query string param");
    if (!lang) throw new Error("lang is a mandatory query string param");
    if (!Object.values(LangEnum).includes((lang as any))) throw new Error("unrecognized lang: " + lang)

    // create repository instances
    const repoConstructor = getRepoConstructor(lang as LangEnum)
    const pagemetaRepo = new repoConstructor();
    const pageVersionRepo = new PageVersionRepository();
    const pageConfigRepo = new PageConfigRepository();
    const pageContentRepo = new PageContentRepository();

    // fetch pagemeta and page version
    const [pagemetaItem, pageVersionItem] = await Promise.all([
        pagemetaRepo.getPagemeta(pagePath),
        pageVersionRepo.getPageVersion(versionTag, pagePath)
    ])
    const pagemeta: Pagemeta = buildPagemeta(pagemetaItem)
    const pageVersion: PageVersion = buildPageVersion(pageVersionItem)

    // fetch page config and content
    const [pageConfigItem, pageContentItem] = await Promise.all([
        pageConfigRepo.getItem({ uuid: { S: pageVersion.configUUID } }),
        pageContentRepo.getItem({ uuid: { S: pageVersion.contentUUID } }),
    ])
    const pageConfig: PageConfig = buildPageConfig(pageConfigItem)
    const pageContent: PageContent = buildPageContent(pageContentItem)

    // generate html
    const generatePageRequest = buildGeneratePageRequest({ config: pageConfig, content: pageContent });
    const generator = new PageGenerator(env);
    const page: GeneratePageResponse = await generator.generatePage(generatePageRequest.content, generatePageRequest.config);

    // upload html to s3
    const s3 = new S3Operations(getEnvVariable("BUCKET_NAME"))
    await s3.uploadPage(page.data.html, pagemeta.s3Path, "text/html")

    // update pagemeta object
    pagemeta.isPublished = true
    pagemeta.versionTag = versionTag
    await pagemetaRepo.savePagemeta(pagemeta)

    return pagemeta
}

export const handleUnpublishPage = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<Pagemeta> => {
    // extract query params
    const pagePath = event.queryStringParameters?.pagePath
    const lang: string | undefined = event.queryStringParameters?.lang;
    if (!pagePath) throw new Error("pagePath is a mandatory query string param");
    if (!lang) throw new Error("lang is a mandatory query string param");
    if (!Object.values(LangEnum).includes((lang as any))) throw new Error("unrecognized lang: " + lang)

    // create repository instances
    const repoConstructor = getRepoConstructor(lang as LangEnum)
    const pagemetaRepo = new repoConstructor();

    // fetch pagemeta
    const pagemetaItem = await pagemetaRepo.getPagemeta(pagePath)
    const pagemeta: Pagemeta = buildPagemeta(pagemetaItem)

    // delete page on s3
    const s3 = new S3Operations(getEnvVariable("BUCKET_NAME"))
    await s3.deletePage(pagemeta.s3Path)

    // update pagemeta
    pagemeta.isPublished = false
    await pagemetaRepo.savePagemeta(pagemeta)

    return pagemeta
}