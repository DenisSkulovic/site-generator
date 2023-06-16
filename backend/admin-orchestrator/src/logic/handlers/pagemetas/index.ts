import { APIGatewayEvent } from "aws-lambda";
import { PagemetaRepository } from "../../../../../repository_module/src";
import { buildPagemeta, Pagemeta } from "../../../../../../admin_cls_module/src";

export const handlePagemetaGetAll = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<Pagemeta[]> => {
    const pagemetaRepo = new PagemetaRepository();
    const items = await pagemetaRepo.getAllItems();
    const pagemetas = items.map((item) => {
        const pagemeta = buildPagemeta(item)
        return pagemeta
    })
    return pagemetas
};

export const handlePagemetaGet = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<Pagemeta> => {
    const path: string | undefined = event.queryStringParameters?.path;
    if (!path) throw new Error("path is a mandatory query string param");
    const pagemetaRepo = new PagemetaRepository();
    const item = await pagemetaRepo.getItem(path);
    const pagemeta: Pagemeta = buildPagemeta(item)
    return pagemeta
};
