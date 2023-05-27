<template>
    <div :style="styles" class="line" />
</template>

<script>
export default {
    name: "LineComponent",
    props: {
        direction: {
            type: String,
            default: "horizontal" // horizontal, vertical
        },
        color: {
            type: String,
            default: "#173E6733"
        },
        thickness: {
            type: String,
            default: "1px" // will be used for width or height
        },
        borderType: {
            type: String,
            default: "solid" // solid, dashed, ...
        },
    },
    computed: {
        styles() {
            const styles = { border: "none" }
            const border = `${this.thickness} ${this.borderType} ${this.color}`
            if (this.direction === "horizontal") {
                styles["border-bottom"] = border
                styles["height"] = 0
            }
            if (this.direction === "vertical") {
                styles["border-left"] = border
                styles["width"] = 0
            }
            return styles
        },
    }
}
</script>

<style lang="scss" scoped>
.line {
    width: 100%;
    height: 100%;
}
</style>