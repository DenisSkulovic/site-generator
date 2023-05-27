<template>
    <div :style="styles" @click.stop="handleClick" class="overlay d-flex justify-content-center align-items-center">
        <slot />
    </div>
</template>

<script>
export default {
    name: "OverlayComponent",
    props: {
        position: String,
        background: String,
        backdropFilter: String,
        zIndex: Number,
        isTransitioning: {
            type: Boolean,
            default: true,
        },
        transitionSpeed: {
            type: Number,
            default: 250,
        }
    },
    computed: {
        styles() {
            return {
                position: this.position,
                background: this.background,
                backdropFilter: this.backdropFilter,
                zIndex: this.zIndex,
                transition: this.isTransitioning ? `background ${this.transitionSpeed}ms ease-in-out, opacity ${this.transitionSpeed}ms ease-in-out` : ''
            }
        }
    },
    methods: {
        handleClick() {
            this.$emit("overlayClick")
        }
    }
}
</script>

<style lang="scss" scoped>
.overlay {
    display: none;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(4px);
    z-index: 1000;
    position: absolute;
    background: #0D141BC2;
    opacity: 0;
}

.overlay.open {
    opacity: 1;
}
</style>