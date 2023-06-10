import * as AWS from "aws-sdk";

export class S3Operations {
    private s3: AWS.S3;
    private bucketName: string

    constructor(bucketName: string) {
        const region = process.env.REGION
        if (!region) throw new Error("REGION is a mandatory env param")
        AWS.config.update({ region }); // set your region
        this.s3 = new AWS.S3();
        this.bucketName = bucketName
    }

    async uploadPage(html: string, key: string, contentType = "text/html"): Promise<void> {
        const fileData = Buffer.from(html, 'utf8');
        const params: AWS.S3.PutObjectRequest = {
            Bucket: this.bucketName,
            Key: key,
            Body: fileData,
            ContentType: contentType
        };
        try {
            await this.s3.putObject(params).promise();
            console.log("Uploaded file:", key);
        } catch (error) {
            console.error("Unable to upload file. Error:", JSON.stringify(error));
        }
    }

    async deletePage(key: string): Promise<void> {
        const params: AWS.S3.DeleteObjectRequest = {
            Bucket: this.bucketName,
            Key: key
        };
        try {
            await this.s3.deleteObject(params).promise();
            console.log("Deleted file:", key);
        } catch (error) {
            console.error("Unable to delete file. Error:", JSON.stringify(error));
        }
    }

    async uploadImage(imageData: Buffer, key: string, contentType = "image/png"): Promise<void> {
        const params: AWS.S3.PutObjectRequest = {
            Bucket: this.bucketName,
            Key: key,
            Body: imageData,
            ContentType: contentType
        };
        try {
            await this.s3.putObject(params).promise();
            console.log("Uploaded image:", key);
        } catch (error) {
            console.error("Unable to upload image. Error:", JSON.stringify(error));
        }
    }

    async getImage(key: string): Promise<AWS.S3.GetObjectOutput> {
        const params: AWS.S3.GetObjectRequest = {
            Bucket: this.bucketName,
            Key: key
        };
        try {
            const data = await this.s3.getObject(params).promise();
            console.log("Retrieved image:", key);
            return data;
        } catch (error) {
            console.error("Unable to retrieve image. Error:", JSON.stringify(error));
        }
    }

    async deleteImage(key: string): Promise<void> {
        const params: AWS.S3.DeleteObjectRequest = {
            Bucket: this.bucketName,
            Key: key
        };
        try {
            await this.s3.deleteObject(params).promise();
            console.log("Deleted image:", key);
        } catch (error) {
            console.error("Unable to delete image. Error:", JSON.stringify(error));
        }
    }

    async putJson(fileName: string, data: any): Promise<void> {
        const params: AWS.S3.PutObjectRequest = {
            Bucket: this.bucketName,
            Key: `${fileName}.json`,
            Body: JSON.stringify(data),
            ContentType: "application/json"
        };
        try {
            await this.s3.putObject(params).promise();
            console.log(`Uploaded JSON file "${fileName}.json"`);
        } catch (error) {
            throw new Error("Unable to upload JSON file. Error: " + JSON.stringify(error));
        }
    }

    async getJson(fileName: string): Promise<any> {
        const params: AWS.S3.GetObjectRequest = {
            Bucket: this.bucketName,
            Key: `${fileName}.json`
        };
        try {
            const data = await this.s3.getObject(params).promise();
            console.log(`Retrieved JSON file "${fileName}.json": ` + JSON.stringify(data))
            return data
        } catch (error) {
            throw new Error("Unable to upload JSON file. Error: " + JSON.stringify(error));
        }
    }

    async uploadCSS(css: string, key: string, contentType = "text/css"): Promise<void> {
        const fileData = Buffer.from(css, 'utf8');
        const params: AWS.S3.PutObjectRequest = {
            Bucket: this.bucketName,
            Key: key,
            Body: fileData,
            ContentType: contentType
        };
        try {
            await this.s3.putObject(params).promise();
            console.log("Uploaded CSS file:", key);
        } catch (error) {
            console.error("Unable to upload CSS file. Error:", JSON.stringify(error));
        }
    }

    async getCSS(key: string): Promise<AWS.S3.GetObjectOutput> {
        const params: AWS.S3.GetObjectRequest = {
            Bucket: this.bucketName,
            Key: key
        };
        try {
            const data = await this.s3.getObject(params).promise();
            console.log("Retrieved CSS file:", key);
            return data;
        } catch (error) {
            console.error("Unable to retrieve CSS file. Error:", JSON.stringify(error));
        }
    }

    async uploadAsset(assetData: Buffer, key: string, contentType: string): Promise<void> {
        const params: AWS.S3.PutObjectRequest = {
            Bucket: this.bucketName,
            Key: key,
            Body: assetData,
            ContentType: contentType
        };
        try {
            await this.s3.putObject(params).promise();
            console.log("Uploaded asset:", key);
        } catch (error) {
            console.error("Unable to upload asset. Error:", JSON.stringify(error));
        }
    }

    async downloadAsset(key: string): Promise<AWS.S3.GetObjectOutput> {
        const params: AWS.S3.GetObjectRequest = {
            Bucket: this.bucketName,
            Key: key
        };
        try {
            const data = await this.s3.getObject(params).promise();
            console.log("Retrieved asset:", key);
            return data;
        } catch (error) {
            console.error("Unable to retrieve asset. Error:", JSON.stringify(error));
        }
    }

}