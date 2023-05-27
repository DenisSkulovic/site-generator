import * as CLASSES from "../../../../../../classes_module/src"
import * as DTO from "../../../../../../page_cls_module/src"
import * as AWS from "aws-sdk"


const fetchHeaderFromDynamo = async (headerId: string): Promise<DTO.HeaderHTMLObject | undefined> => {
    return {
        "uuid": "578d8fbf-94fa-4ef9-1a30-d63a19314cc0",
        "html": "<!-- HEADER CONFIG UUID :>> 123123 -->\n<!-- HEADER CONTENT UUID :>> 123123 -->\n<!-- HEADER CONFIG METADATA :>> {\"createdTimestamp\":123,\"updatedTimestamp\":123,\"clazz\":\"HeaderConfigMetadata\"} -->\n<!-- HEADER CONTENT METADATA :>> {\"createdTimestamp\":123,\"updatedTimestamp\":123,\"clazz\":\"HeaderContentMetadata\"} -->\n<header>\n\n    <div>\n        <img src=\"www.google.com\" alt=\"logoAlt\"/>\n    </div>\n\n    <link />\n\n</header>\n\n\n    <nav>\n    \n        <div>\n            <ul>\n                \n                    <li></li>\n                \n                    <li></li>\n                \n            </ul>\n        </div>\n    \n    </nav>\n",
        "config": {
            "uuid": "123123",
            "templateVersion": "test_version",
            "bootstrapVersion": "bootstrap-5-0-2",
            "isIncludeNavbar": true,
            "metadata": {
                "createdTimestamp": 123,
                "updatedTimestamp": 123,
                "clazz": "HeaderConfigMetadata"
            },
            "clazz": "HeaderConfig"
        },
        "content": {
            "uuid": "123123",
            "logoUrl": "www.google.com",
            "logoAlt": "logoAlt",
            "navItems": [
                {
                    "label": "nav1",
                    "url": "www.google.com",
                    "clazz": "NavItem"
                },
                {
                    "label": "nav2",
                    "url": "www.google.com",
                    "clazz": "NavItem"
                }
            ],
            "metadata": {
                "createdTimestamp": 123,
                "updatedTimestamp": 123,
                "clazz": "HeaderContentMetadata"
            },
            "clazz": "HeaderContent"
        },
        "metadata": {
            "createdTimestamp": 1683050470607,
            "updatedTimestamp": 1683050470607,
            "clazz": "HeaderHTMLMetadata"
        },
        "clazz": "GenerateHeaderResponse"
    } as DTO.HeaderHTMLObject
    // const headerHeaderHTMLRepository = new CLASSES.HeaderFooterHTMLRepository()

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
    // const scanResArr: Array<DTO.HeaderHTMLObject> = await headerHeaderHTMLRepository.scan(scanParams)
    // const fetchResult: DTO.HeaderHTMLObject | undefined = scanResArr[0]
    // return fetchResult
}

export default fetchHeaderFromDynamo