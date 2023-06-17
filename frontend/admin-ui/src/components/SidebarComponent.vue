<template>
    <v-navigation-drawer app v-model="drawer" color="grey lighten-4">
        <v-list>
            <v-list-item :to="PagePathEnum.HOME">
                <v-list-item-title>{{ PageTitleEnum.HOME }}</v-list-item-title>
            </v-list-item>
            <v-list-item :to="PagePathEnum.HEADER_FOOTER_MANAGER">
                <v-list-item-title>{{ PageTitleEnum.HEADER_FOOTER_MANAGER }}</v-list-item-title>
            </v-list-item>
            <v-list-item :to="PagePathEnum.PAGES">
                <v-list-item-title>{{ PageTitleEnum.PAGES }}</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>
  
<script lang="ts" setup>
import { PagePathEnum, PageTitleEnum } from '@/router'
import { ref, watchEffect } from 'vue';

const props = defineProps({
    modelValue: Boolean,
});

const drawer = ref(props.modelValue);
watchEffect(() => {
    drawer.value = props.modelValue;
});

const emit = defineEmits(['update:modelValue']);
watchEffect(() => {
    emit('update:modelValue', drawer.value);
});
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