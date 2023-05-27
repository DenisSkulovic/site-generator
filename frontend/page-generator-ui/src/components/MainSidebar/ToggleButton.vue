<template>
        <button class="toggle-button btn btn-secondary" @click.stop="handleToggleDisplaySidebar">
            <span v-if="isDisplaySidebar">HIDE</span>
            <span v-else>SHOW</span>
        </button>
</template>

<script lang="ts" setup>
import isDisplaySidebar from "../../state/isDisplaySidebar"
import handleToggleDisplaySidebar from "../../logic/handlers/handleToggleDisplaySidebar"

</script>

<style scoped>
.toggle-button {
    position: absolute;
    left: 0;
    transform: translateX(-100%);
}
</style>