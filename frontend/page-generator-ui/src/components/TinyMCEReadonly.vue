<template>
    <div ref="editor" class="tinymce-editor"></div>
</template>
  
<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import tinymce from 'tinymce';
import 'tinymce/themes/silver';
import 'tinymce/plugins/code';

const props = defineProps<{
    json: string
}>()

let editor: any = null;

const editorValue = ref(JSON.stringify(props.json, null, 4)); // replace this with your own reactive data
const editorRef = ref(null);

onMounted(() => {
    tinymce.init({
        target: editorRef.value,
        plugins: 'code',
        toolbar: 'code',
        theme: 'silver',
        height: 500,
        readonly: 1,  // makes the editor read-only
        setup: function (ed: any) {
            ed.on('init', function (args: any) {
                ed.setContent(editorValue.value);
            });
        }
    }).then((editors: any) => {
        editor = editors[0];
    });
});

watch(editorValue, (newValue) => {
    if (editor && editor.getContent() !== newValue) {
        editor.setContent(newValue);
    }
});

// ensure the editor content is updated when props.json changes
watch(() => props.json, () => {
    editorValue.value = JSON.stringify(props.json, null, 4);
});
</script>
  
<style scoped>
/* Add your CSS styles for the editor here */
</style>
  