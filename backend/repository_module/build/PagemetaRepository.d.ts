import { Repository } from "./Repository";
import { TableEnum } from "./TableEnum";
import { Pagemeta } from "../../../admin_cls_module";
export declare class PagemetaRepository extends Repository {
    constructor(tableName: TableEnum);
    getPagemeta(path: string): Promise<any>;
    savePagemeta(pagemeta: Pagemeta): Promise<any>;
    deletePagemeta(pagemeta: Pagemeta): Promise<any>;
}
//# sourceMappingURL=PagemetaRepository.d.ts.map