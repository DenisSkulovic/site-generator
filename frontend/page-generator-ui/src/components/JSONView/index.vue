<template>
    <div class="p-3">
        <CollapseExpand :active="toggleState['config']" @toggleClick="() => handleToggleExpandable('config')">
            <template #title>
                <h3>CONFIG</h3>
            </template>
            <template #content>
                <TinyMCEReadonly :json="JSON.stringify(editPageConfig.value, null, 4)" />
            </template>
        </CollapseExpand>
    </div>
    <div class="p-3">
        <CollapseExpand :active="toggleState['content']" @toggleClick="() => handleToggleExpandable('content')">
            <template #title>
                <h3>CONTENT</h3>
            </template>
            <template #content>
                <TinyMCEReadonly :json="JSON.stringify(editPageContent.value, null, 4)" />
            </template>
        </CollapseExpand>
    </div>
    <div class="p-3">
        <CollapseExpand :active="toggleState['htmlObject']" @toggleClick="() => handleToggleExpandable('htmlObject')">
            <template #title>
                <h3>HTML OBJECT</h3>
            </template>
            <template #content>
                <TinyMCEReadonly :json="JSON.stringify(editPageHTMLObject.value, null, 4)" />
            </template>
        </CollapseExpand>
    </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import CollapseExpand from '../../components/CollapseExpand.vue';
import TinyMCEReadonly from '../../components/TinyMCEReadonly.vue';
import { editPageConfig } from '../../state/pageConfigState';
import { editPageContent } from '../../state/pageContentState';
import { editPageHTMLObject } from '../../state/pageHTMLObjectState';

const toggleState = reactive({
    config: false,
    content: false,
    htmlObject: false,
})

const handleToggleExpandable = (name: "config" | 'content' | "htmlObject") => {
    toggleState[name] = !toggleState[name]
}

</script>

<style scoped></style>
