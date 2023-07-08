import { Repository } from "./Repository";
import { PageVersion } from "../../../page_cls_module";
export declare class PageVersionRepository extends Repository {
    constructor();
    getPageVersion(tag: string, pagePath: string): Promise<PageVersion>;
    getPageVersionsForPagePath(pagePath: string): Promise<PageVersion[]>;
}
//# sourceMappingURL=PageVersionRepository.d.ts.map