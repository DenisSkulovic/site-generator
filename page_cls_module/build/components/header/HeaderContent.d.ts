import { HeaderContentMetadata } from "./HeaderContentMetadata";
import { NavItem } from "./NavItem";
export declare const buildHeaderContent: (obj: any) => HeaderContent;
export declare class HeaderContent {
    uuid: string;
    logoUrl: string;
    logoAlt: string;
    navItems: NavItem[];
    metadata: HeaderContentMetadata;
    clazz: string;
    constructor(uuid: string, logoUrl: string, logoAlt: string, navItems: NavItem[], metadata: HeaderContentMetadata);
}
//# sourceMappingURL=HeaderContent.d.ts.map