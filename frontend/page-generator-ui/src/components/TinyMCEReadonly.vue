<template>
    <div ref="editor" class="tinymce-editor"></div>
</template>
  
<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import tinymce, { Editor } from 'tinymce';
import 'tinymce/themes/silver';
import 'tinymce/plugins/code';
import 'tinymce/icons/default';
import 'tinymce/skins/ui/oxide/skin.min.css';
import 'tinymce/skins/ui/oxide/content.min.css';

const props = defineProps<{
    json: string
}>()

let editorObj: Editor | null = null;

const editorValue = ref(JSON.stringify(props.json, null, 4)); // replace this with your own reactive data
const editor = ref();

onMounted(async () => {
    console.log(`editor.value`, editor.value)
    const editors: Editor[] = await tinymce.init({
        target: editor.value,
        plugins: 'code',
        toolbar: 'code',
        theme: 'silver',
        height: 500,
        readonly: true,  // makes the editor read-only
        setup: function (ed: any) {
            ed.on('init', function (args: any) {
                ed.setContent(editorValue.value);
            });
        }
    })
    editorObj = editors[0];
});

watch(editorValue, (newValue) => {
    if (editorObj && editorObj.getContent() !== newValue) {
        editorObj.setContent(newValue);
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
  