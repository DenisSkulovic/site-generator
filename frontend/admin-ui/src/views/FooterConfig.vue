<template>
    <div v-if="config">
        <h2>Footer Configuration</h2>
        <div>
            <label for="templateVersion">Template Version:</label>
            <select id="templateVersion" v-model="config.templateVersion">
                <option v-for="version in templateVersions" :key="version" :value="version">{{ version }}</option>
            </select>
        </div>
        <div>
            <label for="bootstrapVersion">Bootstrap Version:</label>
            <select id="bootstrapVersion" v-model="config.bootstrapVersion">
                <option v-for="version in bootstrapVersions" :key="version" :value="version">{{ version }}</option>
            </select>
        </div>

        <div v-if="content">
            <h2>Footer Content</h2>
            <!-- <div>
                <label for="logoUrl">Logo URL:</label>
                <input type="text" id="logoUrl" v-model="content.logoUrl" />
            </div>
            <div>
                <label for="logoAlt">Logo Alt Text:</label>
                <input type="text" id="logoAlt" v-model="content.logoAlt" />
            </div> -->
        </div>
    </div>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue';
import { type FooterConfig, type FooterContent, FooterTemplateVersionEnum, BootstrapVersionEnum } from '@page_cls_module';

defineProps<{
    config: FooterConfig | null;
    content: FooterContent | null;
}>()

const templateVersions = ref<string[]>(Object.values(FooterTemplateVersionEnum));
const bootstrapVersions = ref<string[]>(Object.values(BootstrapVersionEnum));
</script>