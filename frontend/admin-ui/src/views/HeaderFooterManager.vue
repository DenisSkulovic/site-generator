<template>
    <div>
        <div>
            <h3>Header</h3>
            <div v-if="headerContentEdit.value && headerConfigEdit.value">
                <h4>Links</h4>
                <div v-for="(link, link_i) in headerContentEdit.value.navItems">

                </div>
            </div>
        </div>
        <div>
            <h3>Footer</h3>
            <div v-if="footerContentEdit.value && footerConfigEdit.value">

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue"
import { headerConfigEdit, footerConfigEdit } from "@/state/configState"
import { headerContentEdit, footerContentEdit } from "@/state/contentState"
import { FooterService } from "@/service/FooterService"
import { HeaderService } from "@/service/HeaderService"
import adminUrl from "@/state/adminUrl"

onMounted(async () => {
    const footerService = new FooterService(adminUrl.value)
    const headerService = new HeaderService(adminUrl.value)
    await Promise.all([
        footerService.fetchFooterConfig(),
        footerService.fetchFooterContent(),
        headerService.fetchHeaderConfig(),
        headerService.fetchHeaderContent(),
    ])
})


</script>

<style scoped></style>