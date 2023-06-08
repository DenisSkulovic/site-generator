<template>
    <div>
        <h1>Header and Footer Configuration</h1>
        <HeaderConfig :config="headerConfigEdit" :content="headerContentEdit" />
        <FooterConfig :config="footerConfigEdit" :content="footerContentEdit" />
        <button @click="saveConfig">Save Configuration</button>
        <button @click="saveContent">Save Content</button>
        <button @click="regenerate">Regenerate</button>
    </div>
</template>
  
<script lang="ts" setup>
import { onMounted } from 'vue';
import HeaderConfig from './HeaderConfig.vue';
import FooterConfig from './FooterConfig.vue';
import {
    headerConfigEdit,
    footerConfigEdit,
} from '@/state/configState';
import {
    headerContentEdit,
    footerContentEdit,
} from '@/state/contentState';
import adminUrl from '@/state/adminUrl';
import { FooterService } from '@/service/FooterService';
import { HeaderService } from '@/service/HeaderService';


// Fetch header and footer configuration and content
const headerService = new HeaderService(adminUrl.value);
const footerService = new FooterService(adminUrl.value);


// Save header and footer configuration
const saveConfig = async () => {
    await Promise.all([
        headerService.saveHeaderConfig(),
        footerService.saveFooterConfig(),
    ]);
};

// Save header and footer content
const saveContent = async () => {
    await Promise.all([
        headerService.saveHeaderContent(),
        footerService.saveFooterContent(),
    ]);
};

// Regenerate header and footer
const regenerate = async () => {
    await Promise.all([
        headerService.regenerateHeader(),
        footerService.regenetareFooter(),
    ]);
};

// Fetch configuration and content on component mount
onMounted(async () => {
    await Promise.all([
        headerService.fetchHeaderConfig(),
        headerService.fetchHeaderContent(),
        footerService.fetchFooterConfig(),
        footerService.fetchFooterContent(),
    ])
});
</script>

  