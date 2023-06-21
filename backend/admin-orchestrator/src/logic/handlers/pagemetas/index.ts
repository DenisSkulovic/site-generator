import { APIGatewayEvent } from "aws-lambda";
import { PagemetaLTRepository, PagemetaRepository } from "../../../../../repository_module/src";
import { buildPagemeta, Pagemeta } from "../../../../../../admin_cls_module/src";
import { LangEnum } from "../../../../../../page_cls_module/src";
import { Key } from "aws-sdk/clients/dynamodb";

type Constructor<T> = new (...args: any[]) => T;
const langToPagemetaRepo: Map<LangEnum, Constructor<PagemetaRepository>> = new Map([
    [LangEnum.LT, PagemetaLTRepository]
])

export const getRepoConstructor = (lang: LangEnum): Constructor<PagemetaRepository> => {
    const repoConstructor: Constructor<PagemetaRepository> | undefined = langToPagemetaRepo.get(lang as LangEnum)
    if (!repoConstructor) throw new Error("lang unrecognized: " + lang)
    return repoConstructor
}

export const handlePagemetaGetAll = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<Pagemeta[]> => {
    const lang: string | undefined = event.queryStringParameters?.lang;
    if (!lang) throw new Error("lang is a mandatory query string param");
    if (!Object.values(LangEnum).includes((lang as any))) throw new Error("unrecognized lang: " + lang)

    const repoConstructor = getRepoConstructor(lang as LangEnum)
    const pagemetaRepo = new repoConstructor();
    const items: any[] = await pagemetaRepo.getAllItems();
    const pagemetas: Pagemeta[] = items.map((item: any) => {
        const pagemeta = buildPagemeta(item)
        return pagemeta
    })
    return pagemetas
};

export const handlePagemetaGet = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<Pagemeta> => {
    const path: string | undefined = decodeURIComponent(event.queryStringParameters?.path || "");
    if (!path) throw new Error("path is a mandatory query string param");
    const lang: string | undefined = event.queryStringParameters?.lang;
    if (!lang) throw new Error("lang is a mandatory query string param");

    const repoConstructor = getRepoConstructor(lang as LangEnum)
    const pagemetaRepo = new repoConstructor();
    const item: any | undefined = await pagemetaRepo.getPagemeta(path);
    if (!item) throw new Error(`no pagemeta found for path: ${path}; lang: ${lang}`)
    const pagemeta: Pagemeta = buildPagemeta(item)
    return pagemeta
};

export const handlePagemetaPost = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<Pagemeta> => {
    const lang: string | undefined = event.queryStringParameters?.lang;
    if (!lang) throw new Error("lang is a mandatory query string param");
    if (!Object.values(LangEnum).includes((lang as any))) throw new Error("unrecognized lang: " + lang)

    const body = JSON.parse(event.body || '{}');
    if (!body) throw new Error("Request body must not be empty");

    const repoConstructor = getRepoConstructor(lang as LangEnum)
    const pagemetaRepo = new repoConstructor();

    const newPagemeta: Pagemeta = buildPagemeta(body);
    await pagemetaRepo.putItem(newPagemeta);
    return newPagemeta
};

export const handlePagemetaPut = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<Pagemeta> => {
    const lang: string | undefined = event.queryStringParameters?.lang;
    if (!lang) throw new Error("lang is a mandatory query string param");
    if (!Object.values(LangEnum).includes((lang as any))) throw new Error("unrecognized lang: " + lang)

    const path: string | undefined = decodeURIComponent(event.queryStringParameters?.path || "");
    if (!path) throw new Error("path is a mandatory query string param");

    const body = JSON.parse(event.body || '{}');
    if (!body) throw new Error("Request body must not be empty");

    const repoConstructor = getRepoConstructor(lang as LangEnum)
    const pagemetaRepo = new repoConstructor();

    const updatedPagemeta: Pagemeta = buildPagemeta(body);
    await pagemetaRepo.putItem(updatedPagemeta);
    return updatedPagemeta;
};

export const handlePagemetaDelete = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<string> => {
    const lang: string | undefined = event.queryStringParameters?.lang;
    if (!lang) throw new Error("lang is a mandatory query string param");
    if (!Object.values(LangEnum).includes((lang as any))) throw new Error("unrecognized lang: " + lang)

    const path: string | undefined = decodeURIComponent(event.queryStringParameters?.path || "");
    if (!path) throw new Error("path is a mandatory query string param");

    const repoConstructor = getRepoConstructor(lang as LangEnum)
    const pagemetaRepo = new repoConstructor();
    const pagemetaItem = await pagemetaRepo.getPagemeta(path)
    const pagemeta: Pagemeta = buildPagemeta(pagemetaItem)

    if (pagemeta.isPublished) throw new Error("cannot delete pagemeta of a page that is still published")

    await pagemetaRepo.deletePagemeta(pagemeta);
    return `Pagemeta with path ${path} deleted successfully.`;
};
