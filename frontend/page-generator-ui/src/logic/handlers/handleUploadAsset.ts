import { AssetService } from "@/service/AssetService";
import adminUrl from "@/state/adminUrl";
import bucketName from "@/state/bucketName";
import { editPageConfig } from "@/state/pageConfigState";

const handleUploadAsset = async (file: File, s3Path: string, fileExtension: "js" | "css") => {
    if (!editPageConfig.value) throw new Error("editPageConfig.value cannot be undefined")
    const assetService = new AssetService(adminUrl.value, bucketName.value, editPageConfig.value?.pagePath);
    if (fileExtension === "js") {
        await assetService.uploadScript(file, s3Path);
    } else if (fileExtension === "css") {
        await assetService.uploadStyle(file, s3Path);
    }
}

export default handleUploadAsset