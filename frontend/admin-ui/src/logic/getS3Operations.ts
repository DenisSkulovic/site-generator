import { S3Operations } from "@s3_module"

const getS3Operations = (): S3Operations => {
    const bucketName: string | undefined = process.env.VITE_APP_BUCKET_NAME
    if (!bucketName) throw new Error("VITE_APP_BUCKET_NAME is a mandatory env param")
    const s3: S3Operations = new S3Operations(bucketName)
    return s3
}

export default getS3Operations