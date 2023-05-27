<template>

<div class="grid-frame-wrapper">
    <div class="top-section p-3">
        <slot name="top"></slot>
    </div>
    <div class="main-section p-3">
        <slot name="main"></slot>
    </div>
    <div class="bottom-section p-3">
        <slot name="bottom"></slot>
    </div>
</div>

</template>
<style scoped>

.top-section {
    border: 1px solid grey;
}

.grid-frame-wrapper {
    display: grid;
    grid-template-rows: 1fr 1000fr 1fr;
    height: 100vh;
}
.main-section {
    overflow: auto;
}

.bottom-section {
    border: 1px solid grey;
}
</style>