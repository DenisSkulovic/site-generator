import { BlockContent } from "@page_cls_module";
declare const getBlockContentConstructor: (template: BlockTemplateEnum) => Constructor<BlockContent> | undefined;
export default getBlockContentConstructor;
