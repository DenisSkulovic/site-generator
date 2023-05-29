import * as DTO from "@page_cls_module";
declare const fetchHeaderFromDynamo: (headerId: string) => Promise<DTO.HeaderHTMLObject | undefined>;
export default fetchHeaderFromDynamo;
