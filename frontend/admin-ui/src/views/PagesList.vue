<template>
    <div>
        <AddPage ></AddPage>
        <v-container v-if="pagemetasEdit.value && pagemetasEdit.value.length">
            <v-row>
                <v-col>
                    <h1>Page Management</h1>
                    <v-data-table :headers="tableHeaders" :items="displayedPages" :items-per-page="itemsPerPage"
                        :page.sync="currentPage" :server-items-length="pagemetasEdit.value.length" :loading="isLoadingAny"
                        @update:page="updateCurrentPage" class="elevation-1">
                        <template v-slot:item.actions="{ item }">
                            <v-btn color="blue" text @click="handleOpenPageInEditor(item)">Edit</v-btn>
                            <v-btn color="red" text @click="handleDeletePageClick(item)">Delete</v-btn>
                        </template>
                    </v-data-table>
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
import type {Ref} from "vue"
import { pagemetasEdit } from '@/state/pagemetas';
import { handleOpenPageInEditor, handleDeletePageClick } from "@/logic/handlers"
import fetchPagemetas from '@/logic/fetchPagemetas';
import { Pagemeta } from '../../../../admin_cls_module/src';
import {isLoadingAny} from "@/composables/useLoading"
import AddPage from "@/components/AddPage.vue"

class DataTableHeader {
    key: string = "";
    title: string = "";
    value?: any;
    colspan?: number;
    rowspan?: number;
    fixed?: boolean;
    align?: 'start' | 'end' | 'center';
    width?: number | string;
    minWidth?: string;
    maxWidth?: string;
    sortable?: boolean;
    sort?: any;
};


const currentPage = ref(1);
const itemsPerPage = 10;

const pageFields = Object.keys(Pagemeta);
const tableHeaders: Ref<DataTableHeader[]> = ref(
    pageFields.map((field) => {
        const header = new DataTableHeader()
        header.key = field
        header.value = field
        return header
    })
);

const displayedPages = computed(() => {
    if (!pagemetasEdit.value) return []
    const startIndex = (currentPage.value - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return pagemetasEdit.value.slice(startIndex, endIndex);
});



const updateCurrentPage = (newPage: number) => {
    currentPage.value = newPage;
};


onMounted(async () => {
    await Promise.all([
        fetchPagemetas(),
    ])
}
)
</script>

<style scoped>
.actions {
    display: none;
}

.item:hover .actions {
    display: block;
}

.elevation-1 {
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
        0 1px 5px 0 rgba(0, 0, 0, 0.12),
        0 3px 1px -2px rgba(0, 0, 0, 0.2);
}
</style>
  