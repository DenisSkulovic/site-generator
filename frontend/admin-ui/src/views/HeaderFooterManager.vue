<template>
    <v-container>
        <v-row>
            <v-col>
                <h1>Header and Footer Configuration</h1>
            </v-col>
        </v-row>
        <v-container>
            <v-row>
                <v-col cols="6">
                    <HeaderConfig :config="headerConfigEdit.value" :content="headerContentEdit.value" />
                </v-col>
                <v-col cols="6">
                    <FooterConfig :config="footerConfigEdit.value" :content="footerContentEdit.value" />
                </v-col>
            </v-row>
        </v-container>
        <v-row>
            <v-col>
                <v-btn @click="saveConfig">Save Configuration</v-btn>
                <v-btn @click="saveContent">Save Content</v-btn>
                <v-btn @click="regenerate">Regenerate</v-btn>
            </v-col>
        </v-row>
    </v-container>
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
import { handleRegenerateHeader, handleRegenerateFooter } from '@/logic/handlers';


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
        handleRegenerateHeader(),
        handleRegenerateFooter(),
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

  