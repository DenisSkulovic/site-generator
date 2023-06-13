<template>
  <PageWrapper>
    <RouterView />
  </PageWrapper>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted } from 'vue';
import PageWrapper from "./components/PageWrapper.vue"

onMounted(async () => {

})
</script>

<style scoped></style>
