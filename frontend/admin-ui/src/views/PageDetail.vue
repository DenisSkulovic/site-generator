<template>
    <div>
        <v-container v-if="displayedVersions && displayedVersions.length">
            <v-row>
                <v-col>
                    <DeletePage v-if="pagemeta" :pagemeta="pagemeta"></DeletePage>
                    <h1>Version Management</h1>
                    <VDataTable :headers="tableHeaders" :items="displayedVersions" :items-per-page="itemsPerPage"
                        :page.sync="currentPage" :server-items-length="state.versions.length" :loading="isLoadingAny"
                        @update:page="updateCurrentPage" class="elevation-1">
                        <template v-slot:item.action="{ item }">
                            <div class="actions">
                                <v-btn small color="blue"
                                    @click="() => handleOpenPageInEditor(item.selectable.path, lang, item.selectable.tag)">Edit</v-btn>
                                <PublishUnpublishPage :isPublished="item.selectable.tag === pagemeta?.versionTag"
                                    :path="item.selectable.path" :versionTag="item.selectable.tag"
                                    @refreshData="refreshData"></PublishUnpublishPage>
                                <DeleteVersion :disabled="item.selectable.tag === pagemeta?.versionTag" :pageVersion="item.selectable" v-if="item.selectable.tag !== pagemeta.versionTag"></DeleteVersion>
                            </div>
                        </template>
                    </VDataTable>
                </v-col>
            </v-row>
        </v-container>
        <v-container v-else-if="displayedVersions">
            <v-row>
                <v-col>
                    <h2>No versions available</h2>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>


<script setup lang="ts">
import lang from '@/state/lang';
import DeleteVersion from "@/components/DeleteVersion.vue"
import PublishUnpublishPage from "@/components/PublishUnpublishPage.vue"
import { PagemetaService, PageVersionService } from '@/service';
import { handleOpenPageInEditor } from "@/logic/handlers"
import { computed, onMounted, reactive, ref, type Ref } from 'vue';
import { DataTableHeader } from '@/classes/DataTableHeader';
import getQueryParams from '@/logic/getQueryParams';
import adminUrl from '@/state/adminUrl';
import type { Pagemeta } from '../../../../admin_cls_module/build_browser';
import type { ComputedRef } from 'vue';
import type { PageVersion } from '../../../../page_cls_module/src';
import useLoading, { isLoadingAny } from "@/composables/useLoading"
import DeletePage from '@/components/DeletePage.vue';

const pagemeta: Ref<Pagemeta | null> = ref(null)


const state: { versions: PageVersion[] } = reactive({
    versions: []
})

const pagemetaService: ComputedRef<PagemetaService> = computed(() => {
    return new PagemetaService(adminUrl.value)
})
const pageVersionService: ComputedRef<PageVersionService> = computed(() => {
    return new PageVersionService(adminUrl.value, pagePath.value)
})

const getPageVersions = async (pagePath: string) => {
    const { startLoadingThis, stopLoadingThis } = useLoading("getPageVersions")
    startLoadingThis()
    state.versions = await pageVersionService.value.getPageVersions(pagePath)
    stopLoadingThis()
}
const getPagemeta = async (pagePath: string) => {
    const { startLoadingThis, stopLoadingThis } = useLoading()
    startLoadingThis()
    const pagemetaObj = await pagemetaService.value.fetchPagemeta(pagePath, lang.value)
    if (!pagemetaObj) throw new Error("pagemeta cannot be undefined")
    pagemeta.value = pagemetaObj
    stopLoadingThis()
}

const currentPage = ref(1);
const itemsPerPage = 10;
const tableHeaders = [
    new DataTableHeader('tag', 'Tag', item => item.tag),
    new DataTableHeader('createdTimestamp', 'Created', item => new Date(item.createdTimestamp).toLocaleString()),
    new DataTableHeader('isLive', 'Is Live', item => item.tag === pagemeta.value?.versionTag),
    new DataTableHeader('action', 'Actions', item => ''),
];

const displayedVersions: ComputedRef<PageVersion[]> = computed(() => {
    if (!state.versions) return []
    const startIndex = (currentPage.value - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return state.versions.slice(startIndex, endIndex);
});

const updateCurrentPage = (newPage: number) => {
    currentPage.value = newPage;
};

const refreshData = async () => {
    if (!pagePath.value) throw new Error("pagePath.value cannot be undefined")
    await Promise.all([
        getPagemeta(pagePath.value),
        getPageVersions(pagePath.value),
    ])
}

const pagePath: Ref<string> = ref("")


onMounted(async () => {
    const params = getQueryParams()
    if (!params.pagePath) throw new Error("pagePath is a mandatory query string param")
    pagePath.value = params.pagePath
    await refreshData()
})

</script>

<style scoped></style>