<template>
    <svg
        :width="width"
        :height="height"
        viewBox="0 0 8 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M7.52681 1.19109C7.26681 0.931094 6.84681 0.931094 6.58681 1.19109L4.00015 3.77776L1.41348 1.19109C1.15348 0.931093 0.733481 0.931093 0.473481 1.19109C0.213481 1.45109 0.213481 1.87109 0.473481 2.13109L3.53348 5.19109C3.79348 5.45109 4.21348 5.45109 4.47348 5.19109L7.53348 2.13109C7.78681 1.87776 7.78681 1.45109 7.52681 1.19109Z"
            :fill="color"
        />
    </svg>
</template>

<script>
export default {
    name: 'CheckSvg',
    props: {
        color: {
            type: String,
            default: 'currentColor',
        },
        width: {
            type: Number,
            default: 12,
        },
        height: {
            type: Number,
            default: 10,
        },
    },
}
</script>



