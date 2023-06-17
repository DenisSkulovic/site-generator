<template>
  <v-app>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Site Manager</v-toolbar-title>
    </v-app-bar>
    <HeaderComponent />

    <v-main>
      <v-container fluid>
        <v-row>
          <v-col>
            <!-- This slot is where the actual page content will be injected -->
            <slot></slot>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    
    <FooterComponent />
    <SidebarComponent v-model="drawer" />
  </v-app>
</template>


<script lang="ts" setup>
import { ref } from "vue"
import type { Ref } from "vue"
import HeaderComponent from '@/components/HeaderComponent.vue';
import SidebarComponent from '@/components/SidebarComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';

const drawer: Ref<boolean> = ref(true);

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
