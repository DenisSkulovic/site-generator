<template>
    <div class="overlay" :class="{ 'overlay--open': isOpen, 'overlay--transitioning': isTransitioning }"
        @click.stop="handleClick">
        <slot />
    </div>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{
    isOpen: boolean,
    isTransitioning: boolean,
    transitionSpeed: number
}>(), {
    isOpen: false,
    isTransitioning: true,
    transitionSpeed: 250
})

const emit = defineEmits<{
    (e: "overlayClick"): void
}>()

const handleClick = () => {
    emit("overlayClick");
}

</script>

<style lang="scss" scoped>
.overlay {
    display: none;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(4px);
    z-index: 1000;
    position: absolute;
    background: #0D141BC2;
    opacity: 0;
    transition: background 0ms ease-in-out, opacity 0ms ease-in-out;

    &.overlay--open {
        opacity: 1;
        display: flex;
    }

    &.overlay--transitioning {
        transition: background var(--transition-speed)ms ease-in-out, opacity var(--transition-speed)ms ease-in-out;
    }
}
</style>
