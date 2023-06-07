import getS3Operations from "@/logic/getS3Operations";
import type { S3Operations } from "../../../../s3_module/src";
import {ref} from "vue"
import type {Ref} from "vue"

const s3: Ref<S3Operations> = ref(getS3Operations())

export default s3