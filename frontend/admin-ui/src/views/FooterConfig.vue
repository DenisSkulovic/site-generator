<template>
    <v-container v-if="config">
        <v-row>
            <v-col>
                <h2>Footer Configuration</h2>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-select label="Template Version" v-model="config.templateVersion" :items="templateVersions"></v-select>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-select label="Bootstrap Version" v-model="config.bootstrapVersion" :items="bootstrapVersions"></v-select>
            </v-col>
        </v-row>

        <v-container v-if="content">
            <v-row>
                <v-col>
                    <h2>Footer Content</h2>
                </v-col>
            </v-row>
            <!--
            <v-row>
                <v-col>
                    <v-text-field
                        label="Logo URL"
                        v-model="content.logoUrl"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-text-field
                        label="Logo Alt Text"
                        v-model="content.logoAlt"
                    ></v-text-field>
                </v-col>
            </v-row>
            -->
        </v-container>
    </v-container>
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