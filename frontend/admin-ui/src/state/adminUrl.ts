import {ref} from "vue"
import type {Ref} from "vue"

const url = process.env.VITE_APP_ADMIN_URL
if (!url) throw new Error("VITE_APP_ADMIN_URL is a mandatory env param")

const adminUrl: Ref<string> = ref(url)

export default adminUrl