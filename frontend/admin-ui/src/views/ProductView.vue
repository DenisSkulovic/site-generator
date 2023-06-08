<template>
    <div>
        <h2>Product Detail</h2>
        <div v-for="field in productFields" :key="field">
            <label :for="field">{{ field }}</label>
            <input :id="field" v-model="product[field]" />
        </div>
        <button @click="resetProduct">Reset Product</button>
    </div>
</template>
  
<script lang="ts" setup>
import { Product } from '@page_cls_module';
import { productsEdit, productsCurrent } from "@/state/products"

// Get the property names of the Product class
const productFields = Object.keys(Product);

// Define the product data
const props = defineProps({
    product: {
        type: Object,
        required: true
    }
});

// Reset the product to its initial state
const resetProduct = () => {
    if (!productsCurrent.value) throw new Error("productsCurrent.value cannot be undefined")
    if (!productsEdit.value) throw new Error("productsEdit.value cannot be undefined")
    // Clone the specific product from productsCurrent to productsEdit
    productsEdit.value[productIndex.value] = { ...productsCurrent.value[productIndex.value] };
};

// Update a specific field in the product object
const updateProductField = (field, value) => {
    if (!productsCurrent.value) throw new Error("productsCurrent.value cannot be undefined")
    if (!productsEdit.value) throw new Error("productsEdit.value cannot be undefined")

    // Update the field value in the specific product in productsEdit
    productsEdit.value[productIndex.value][field] = value;
};

// Get the field value from the specific product in productsEdit
const getProductFieldValue = (field) => {
    if (!productsCurrent.value) throw new Error("productsCurrent.value cannot be undefined")
    if (!productsEdit.value) throw new Error("productsEdit.value cannot be undefined")

    return productsEdit.value[productIndex.value][field];
};

</script>
  