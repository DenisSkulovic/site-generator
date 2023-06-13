<template>
    <v-card class="mx-auto my-2" max-width="800">
        <v-card-title
            @click.stop="handleToggleClick"
            class="cursor-pointer d-flex justify-space-between align-center"
        >
            <div class="title">
                <slot name="title" />
            </div>
            <v-icon>
                {{ active ? 'mdi-chevron-down' : 'mdi-chevron-up' }}
            </v-icon>
        </v-card-title>

        <v-expand-transition>
            <v-card-text v-show="active">
                <slot name="content" />
            </v-card-text>
        </v-expand-transition>
    </v-card>
</template>

<script lang="ts" setup>
defineProps<{
    active: boolean
}>()
const emit = defineEmits<{
    (e: 'toggleClick'): void
}>()

// handlers
const handleToggleClick = () => {
    emit('toggleClick')
}
</script>

<style scoped>
.title {
    font-weight: bold;
}
</style>
