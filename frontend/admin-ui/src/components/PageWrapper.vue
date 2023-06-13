<template>
  <v-app>
    <HeaderComponent />

    <v-main>
      <v-container fluid>
        <v-row>
          <v-col cols="3">
            <SidebarComponent />
          </v-col>

          <v-col cols="9">
            <!-- This slot is where the actual page content will be injected -->
            <slot></slot>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <FooterComponent />
  </v-app>
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
