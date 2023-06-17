<template>
    <v-container fluid fill-height>

        <!-- TOP SECTION -->
        <v-row no-gutters class="px-3 pt-3">
            <slot name="top"></slot>
        </v-row>

        <!-- MAIN SECTION -->
        <v-sheet overflow-y-auto class="px-3 my-3 overflow-auto">
            <slot name="main"></slot>
        </v-sheet>

        <!-- BOTTOM SECTION -->
        <v-row no-gutters class="px-3 pb-3">
            <slot name="bottom"></slot>
        </v-row>
    </v-container>
</template>

<style scoped>
.v-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
}
</style>
