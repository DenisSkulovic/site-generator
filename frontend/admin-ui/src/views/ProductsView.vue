<template>
    <div v-if="productsEdit.value && productsEdit.value.length">
        <h1>Product Management</h1>
        <vDataTable :headers="tableHeaders" :items="displayedProducts" :items-per-page="itemsPerPage"
            :page.sync="currentPage" :server-items-length="productsEdit.value.length" :loading="isLoadingThis"
            @update:page="updateCurrentPage" class="elevation-1">
            <template #item.actions="{ item }">
                <v-btn color="primary" text @click="openProductDetail(item.id)">
                    View Details
                </v-btn>
            </template>
        </vDataTable>
    </div>
    <div v-else-if="productsEdit.value">
        <h2>No products available</h2>
    </div>
</template>
  
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { ProductService } from '@/service/ProductService';
import adminUrl from "@/state/adminUrl"
import { Product } from "@page_cls_module"
import { vDataTable } from 'vuetify/lib';
import { productsEdit } from '@/state/products';
import useLoading from "@/composables/useLoading";

const productService = new ProductService(adminUrl.value);
const currentPage = ref(1);
const itemsPerPage = 10;
const { startLoadingThis, stopLoadingThis, isLoadingThis } = useLoading('productList');

const productFields = Object.keys(Product);
const tableHeaders = ref(
    productFields.map((field) => ({ text: field, value: field }))
);

const displayedProducts = computed(() => {
    if (!productsEdit.value) return []
    const startIndex = (currentPage.value - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return productsEdit.value.slice(startIndex, endIndex);
});

const fetchProducts = async () => {
    try {
        startLoadingThis();
        await productService.fetchAll();
    } catch (err) {
        console.error(err);
        // Show error to the user
    } finally {
        stopLoadingThis();
    }
};

const updateCurrentPage = (newPage: number) => {
    currentPage.value = newPage;
};

const openProductDetail = (productId: string) => {
    // Implement logic to navigate to the product detail page using router or emit an event
};

onMounted(fetchProducts)
</script>
  
<style scoped>
.elevation-1 {
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
        0 1px 5px 0 rgba(0, 0, 0, 0.12),
        0 3px 1px -2px rgba(0, 0, 0, 0.2);
}
</style>
  