<template>
  <nav class="col-12">
    <div v-for="(link, link_i) in links" :key="link_i">
      <a :href="link.url">{{ link.label }}</a>
    </div>
  </nav>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { links } from "../config/links"


</script>

<style scoped></style>
