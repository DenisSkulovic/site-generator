<template>
    <div v-if="pagesEdit.value && pagesEdit.value.length">
        <h1>Page Management</h1>
        <div class="controls">
            <v-btn color="green" @click="handleAddNewPageClick">Add New Page</v-btn>
        </div>
        <VDataTable :headers="tableHeaders" :items="displayedPages" :items-per-page="itemsPerPage" :page.sync="currentPage"
            :server-items-length="pagesEdit.value.length" :loading="isLoadingThis" @update:page="updateCurrentPage"
            class="elevation-1">
            <template #item.actions="{ item }">
                <div class="actions">

                    <v-btn color="blue" text @click="handleOpenPageInEditor(item.id)">
                        Edit
                    </v-btn>
                    <v-btn color="red" text @click="handleDeletePageClick(item.id)">
                        Delete
                    </v-btn>
                </div>
            </template>
        </VDataTable>
    </div>
    <div v-else-if="pagesEdit.value">
        <h2>No pages available</h2>
    </div>
</template>
  
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { pagesEdit } from '@/state/pages';
import { handleAddNewPageClick, handleOpenPageInEditor, handleDeletePageClick } from "@/logic/handlers"
import fetchPages from '@/logic/fetchPages';

const currentPage = ref(1);
const itemsPerPage = 10;

const pageFields = Object.keys(Page);
const tableHeaders = ref(
    pageFields.map((field) => ({ text: field, value: field }))
);

const displayedPages = computed(() => {
    if (!pagesEdit.value) return []
    const startIndex = (currentPage.value - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return pagesEdit.value.slice(startIndex, endIndex);
});



const updateCurrentPage = (newPage: number) => {
    currentPage.value = newPage;
};


onMounted(async () => {
    await Promise.all([
        fetchPages(),
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
  