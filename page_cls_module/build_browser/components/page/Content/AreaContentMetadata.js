import { Metadata } from "../../../";
export const buildAreaContentMetadata = (obj) => {
    const metadata = new AreaContentMetadata(obj.createdTimestamp, obj.updatedTimestamp);
    return metadata;
};
export class AreaContentMetadata extends Metadata {
}
//# sourceMappingURL=AreaContentMetadata.js.map