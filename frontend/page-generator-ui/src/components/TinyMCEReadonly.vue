<template>
    <div ref="editor" class="tinymce-editor"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import type { Ref } from "vue"
import tinymce from 'tinymce'
import 'tinymce/icons/default';
import 'tinymce/models/dom';
import 'tinymce/themes/silver';
import 'tinymce/plugins/code';
import 'tinymce/icons/default';
import 'tinymce/skins/ui/oxide/skin.min.css';
import 'tinymce/skins/ui/oxide/content.min.css';

const props = defineProps<{
    json: string;
}>();

let editorObj: Ref<any> = ref(null); // Change the type to 'any'

const editorValue = ref(JSON.stringify(props.json, null, 4));
const editor = ref<HTMLDivElement | null>(null); // Use a ref for the editor element

onMounted(async () => {
    if (!editor.value) throw new Error("editor.value cannot be undefined")
    const editorX = await tinymce.init({
        target: editor.value, // Pass the reference to the editor element
        plugins: 'code',
        toolbar: 'code',
        theme: 'silver',
        height: 500,
        readonly: true,
        setup: (ed) => {
            ed.on('init', () => {
                ed.setContent(editorValue.value);
            });
        },
    });
    editorObj.value = editorX;
});

watch(
    () => editorValue.value,
    (newValue) => {
        if (editorObj.value && editorObj.value.getContent() !== newValue) {
            editorObj.value.setContent(newValue);
        }
    },
    { immediate: true } // Trigger the watch immediately
);

watch(
    () => props.json,
    () => {
        editorValue.value = JSON.stringify(props.json, null, 4);
    }
);
</script>
  
<style scoped></style>
  