import * as CLASSES from "../../../../../../classes_module/src"
import * as DTO from "@page_cls_module"
import * as AWS from "aws-sdk"


const fetchFooterFromDynamo = async (footerId: string): Promise<DTO.FooterHTMLObject | undefined> => {
    return {
        "uuid": "a94f6789-d66d-3eb2-fe5a-555d9a1e3bc2",
        "html": "<!-- FOOTER CONFIG UUID :>> footer_uuid -->\n<!-- FOOTER CONTENT UUID :>> footer_uuid -->\n<!-- FOOTER CONFIG METADATA :>> {\"createdTimestamp\":123,\"updatedTimestamp\":123,\"clazz\":\"FooterConfigMetadata\"} -->\n<!-- FOOTER CONTENT METADATA :>> {\"createdTimestamp\":123,\"updatedTimestamp\":123,\"clazz\":\"FooterContentMetadata\"} -->\n<footer>\n    <div>\n        This is the footer\n    </div>\n</footer>",
        "content": {
            "uuid": "footer_uuid",
            "metadata": {
                "createdTimestamp": 123,
                "updatedTimestamp": 123,
                "clazz": "FooterContentMetadata"
            },
            "clazz": "FooterContent"
        },
        "config": {
            "uuid": "footer_uuid",
            "templateVersion": "test_version",
            "bootstrapVersion": "bootstrap-5-0-2",
            "metadata": {
                "createdTimestamp": 123,
                "updatedTimestamp": 123,
                "clazz": "FooterConfigMetadata"
            },
            "clazz": "FooterConfig"
        },
        "metadata": {
            "createdTimestamp": 1683050531235,
            "updatedTimestamp": 1683050531235,
            "clazz": "FooterHTMLMetadata"
        },
        "clazz": "GenerateFooterResponse"
    } as DTO.FooterHTMLObject
    // const templateVersion: string = config.templateVersion
    // const bootstrapVersion: string = config.bootstrapVersion

    // const headerFooterHTMLRepository = new CLASSES.HeaderFooterHTMLRepository()

    // const TableName = process.env.DYNAMO_FOOTER_TABLE_NAME
    // if (!TableName) throw new Error("DYNAMO_FOOTER_TABLE_NAME is a mandatory env parameter")

    // const ExpressionAttributeNames = {
    //     '#templateVersion': 'templateVersion',
    //     '#bootstrapVersion': 'bootstrapVersion',
    // }
    // const ExpressionAttributeValues = {
    //     ':templateVersion': templateVersion,
    //     ':bootstrapVersion': bootstrapVersion,
    // }
    // const templateFilter: string | undefined = templateVersion && `#templateVersion = :templateVersion`
    // const bootstrapFilter: string | undefined = bootstrapVersion && `#bootstrapVersion = :bootstrapVersion`
    // const FilterExpression = ([
    //     templateFilter,
    //     bootstrapFilter,
    // ]).join(" and ")
    // const Limit: number | undefined = 1
    // const scanParams: AWS.DynamoDB.DocumentClient.ScanInput = {
    //     TableName,
    //     ExpressionAttributeNames,
    //     ExpressionAttributeValues,
    //     FilterExpression,
    //     Limit,
    // };
    // const scanResArr: Array<DTO.FooterHTMLObject> = await headerFooterHTMLRepository.scan(scanParams)
    // const fetchResult: DTO.FooterHTMLObject | undefined = scanResArr[0]
    // return fetchResult
}

export default fetchFooterFromDynamo