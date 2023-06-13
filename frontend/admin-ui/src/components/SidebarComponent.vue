<template>
    <v-navigation-drawer app v-model="drawer" color="grey lighten-4">
        <v-list>
            <v-list-item :to="PagePathEnum.HOME">
                <v-list-item-title>{{ PageNameEnum.HOME }}</v-list-item-title>
            </v-list-item>
            <v-list-item :to="PagePathEnum.HEADER_FOOTER_MANAGER">
                <v-list-item-title>{{ PageNameEnum.HEADER_FOOTER_MANAGER }}</v-list-item-title>
            </v-list-item>
            <v-list-item :to="PagePathEnum.PAGES">
                <v-list-item-title>{{ PageNameEnum.PAGES }}</v-list-item-title>
            </v-list-item>
            <!-- You can add more navigation links here -->
        </v-list>
    </v-navigation-drawer>
</template>
  
<script lang="ts" setup>
import { PagePathEnum, PageNameEnum } from '@/router'

let drawer = true;
</script>
  
<style scoped>
.sidebar {
    width: 200px;
    background-color: #f9f9f9;
    padding: 20px;
}

.sidebar nav ul {
    list-style-type: none;
    padding: 0;
}

.sidebar nav ul li {
    margin-bottom: 15px;
}
</style>