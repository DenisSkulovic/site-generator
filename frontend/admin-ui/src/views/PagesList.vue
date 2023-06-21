<template>
    <div>
        <v-container v-if="pagemetasEdit.value && pagemetasEdit.value.length">
            <v-row>
                <v-col>
                    <h1>Page Management</h1>
                    <VDataTable :headers="tableHeaders" :items="displayedPages" :items-per-page="itemsPerPage"
                        :page.sync="currentPage" :server-items-length="pagemetasEdit.value.length" :loading="isLoadingAny"
                        @update:page="updateCurrentPage" class="elevation-1">
                        <template v-slot:top>
                            <v-toolbar flat>
                                <v-spacer></v-spacer>
                                <AddPage @refreshData="refreshData"></AddPage>
                            </v-toolbar>
                        </template>
                        <template v-slot:item.action="{ item }">
                            <div class="actions">
                                <v-btn small color="blue"
                                    @click="handleOpenPageDetail">Edit</v-btn>
                            </div>
                        </template>
                    </VDataTable>
                </v-col>
            </v-row>
        </v-container>
        <v-container v-else-if="pagemetasEdit.value">
            <v-row>
                <v-col>
                    <h2>No pages available</h2>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
  
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import type { ComputedRef } from "vue"
import { pagemetasEdit } from '@/state/pagemetas';
import fetchPagemetas from '@/logic/fetchPagemetas';
import type { Pagemeta } from '../../../../admin_cls_module/src';
import { isLoadingAny } from "@/composables/useLoading"
import AddPage from "@/components/AddPage.vue"
import { VDataTable } from "vuetify/labs/components"
import { PagePathEnum } from '@/router';
import { DataTableHeader } from '@/classes/DataTableHeader';



const currentPage = ref(1);
const itemsPerPage = 10;
const tableHeaders = [
    new DataTableHeader('path', 'Path', item => item.path),
    new DataTableHeader('s3Path', 'S3 Path', item => item.s3Path),
    new DataTableHeader('s3Link', 'S3 Link', item => item.s3Link),
    new DataTableHeader('versionTag', 'Version Tag', item => item.versionTag),
    new DataTableHeader('isPublished', 'Is Published', item => item.isPublished ? 'Yes' : 'No'),
    new DataTableHeader('created', 'Created', item => new Date(item.metadata.createdTimestamp).toLocaleString()),
    new DataTableHeader('updated', 'Updated', item => new Date(item.metadata.updatedTimestamp).toLocaleString()),
    new DataTableHeader('action', 'Actions', item => ''),
];

const displayedPages: ComputedRef<Pagemeta[]> = computed(() => {
    if (!pagemetasEdit.value) return []
    const startIndex = (currentPage.value - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return pagemetasEdit.value.slice(startIndex, endIndex);
});



const updateCurrentPage = (newPage: number) => {
    currentPage.value = newPage;
};

const refreshData = async () => {
    await fetchPagemetas();
}


const handleOpenPageDetail = (pagePath: string) => {
    window.open(PagePathEnum.PAGE+`?pagePath=${pagePath}`, "_blank")
}


onMounted(async () => {
    await Promise.all([
        refreshData(),
    ])
})

</script>

<style scoped>
.v-data-table__wrapper tbody tr .actions {
    display: none;
}

.v-data-table__wrapper tbody tr:hover .actions {
    display: block;
}

.elevation-1 {
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
        0 1px 5px 0 rgba(0, 0, 0, 0.12),
        0 3px 1px -2px rgba(0, 0, 0, 0.2);
}

.v-data-table__wrapper tbody tr .actions {
    display: none;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.v-data-table__wrapper tbody tr:hover .actions {
    display: flex;
}
</style>
  