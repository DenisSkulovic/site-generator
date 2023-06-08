<template>
  <div class="page-wrapper">
    <header-component></header-component>

    <div class="content-area">
      <sidebar-component></sidebar-component>

      <main class="main-content">
        <!-- This slot is where the actual page content will be injected -->
        <slot></slot>
      </main>
    </div>

    <footer-component></footer-component>
  </div>
</template>

<script lang="ts" setup>
import HeaderComponent from '@/components/HeaderComponent.vue';
import SidebarComponent from '@/components/SidebarComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';

</script>

<style scoped>
.page-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.content-area {
  display: flex;
  flex: 1;
}

.main-content {
  flex: 1;
  overflow-y: auto;
}
</style>
