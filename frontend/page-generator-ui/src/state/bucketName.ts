import {ref} from "vue"
import type {Ref} from "vue"

const url = import.meta.env.VITE_APP_BUCKET_NAME
if (!url) throw new Error("VITE_APP_BUCKET_NAME is a mandatory env param")

const bucketName: Ref<string> = ref(url)

export default bucketName