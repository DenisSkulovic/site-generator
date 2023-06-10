import { defineComponent, ref, openBlock, createElementBlock, withModifiers, renderSlot, createTextVNode, createVNode, withCtx, createCommentVNode, createElementVNode } from 'vue';

var script$3 = /*#__PURE__*/ defineComponent({
    __name: 'DropZone',
    setup(__props) {
        const dragging = ref(false);
        const onDrop = (event) => {
            event.preventDefault();
            dragging.value = false;
            if (!event.dataTransfer) {
                return;
            }
            const files = event.dataTransfer.files;
            Array.from(files);
            // TODO Do something with the files (upload, read, etc.)
        };
        return (_ctx, _cache) => {
            return (openBlock(), createElementBlock("div", {
                class: "dropzone",
                onDragover: _cache[0] || (_cache[0] = withModifiers(() => { }, ["prevent"])),
                onDrop: onDrop
            }, [
                (!dragging.value)
                    ? renderSlot(_ctx.$slots, "default", { key: 0 }, () => [
                        createTextVNode(" Drag and drop files here or click to upload ")
                    ])
                    : renderSlot(_ctx.$slots, "default", { key: 1 }, () => [
                        createTextVNode(" Release to drop the files ")
                    ])
            ], 32 /* HYDRATE_EVENTS */));
        };
    }
});

script$3.__scopeId = "data-v-018dbd86";
script$3.__file = "src/DropZone/DropZone.vue";

const _hoisted_1$2 = { key: 0 };
const _hoisted_2$2 = /*#__PURE__*/ createElementVNode("h2", null, "Drop CSS file here", -1 /* HOISTED */);
const _hoisted_3$2 = /*#__PURE__*/ createElementVNode("p", null, "or click to upload", -1 /* HOISTED */);
const _hoisted_4$2 = /*#__PURE__*/ createElementVNode("h2", null, "Release to drop the file", -1 /* HOISTED */);
const _hoisted_5$2 = { key: 1 };
const _hoisted_6$2 = {
    key: 0,
    src: "/path-to-your-css-icon.png",
    alt: "CSS file"
};
var script$2 = /*#__PURE__*/ defineComponent({
    __name: 'CSSDropZone',
    props: {
        downloadUrl: { type: String, required: true },
        cssExists: { type: null, required: true }
    },
    emits: ["upload"],
    setup(__props, { emit }) {
        const props = __props;
        const isDisplayDropzone = ref(props.cssExists ? true : false);
        const handleDroppedFiles = (files) => {
            if (files.length > 0) {
                emit('upload', files.item(0));
                isDisplayDropzone.value = false;
            }
        };
        const download = () => {
            window.location.href = props.downloadUrl;
        };
        const changeFile = () => {
            isDisplayDropzone.value = true;
        };
        const cancelChange = () => {
            isDisplayDropzone.value = false;
        };
        return (_ctx, _cache) => {
            return (openBlock(), createElementBlock("div", null, [
                (isDisplayDropzone.value)
                    ? (openBlock(), createElementBlock("div", _hoisted_1$2, [
                        createVNode(script$3, { onDroppedFiles: handleDroppedFiles }, {
                            default: withCtx(() => [
                                _hoisted_2$2,
                                _hoisted_3$2
                            ]),
                            dragging: withCtx(() => [
                                _hoisted_4$2
                            ]),
                            _: 1 /* STABLE */
                        }),
                        (_ctx.cssExists)
                            ? (openBlock(), createElementBlock("button", {
                                key: 0,
                                onClick: cancelChange
                            }, "Cancel"))
                            : createCommentVNode("v-if", true)
                    ]))
                    : (openBlock(), createElementBlock("div", _hoisted_5$2, [
                        (_ctx.cssExists)
                            ? (openBlock(), createElementBlock("img", _hoisted_6$2))
                            : createCommentVNode("v-if", true),
                        (_ctx.cssExists)
                            ? (openBlock(), createElementBlock("button", {
                                key: 1,
                                onClick: download
                            }, "Download CSS"))
                            : createCommentVNode("v-if", true),
                        (_ctx.cssExists)
                            ? (openBlock(), createElementBlock("button", {
                                key: 2,
                                onClick: changeFile
                            }, "Change"))
                            : createCommentVNode("v-if", true)
                    ]))
            ]));
        };
    }
});

script$2.__file = "src/DropZone/CSSDropZone.vue";

const _hoisted_1$1 = { key: 0 };
const _hoisted_2$1 = /*#__PURE__*/ createElementVNode("h2", null, "Drop image here", -1 /* HOISTED */);
const _hoisted_3$1 = /*#__PURE__*/ createElementVNode("p", null, "or click to upload", -1 /* HOISTED */);
const _hoisted_4$1 = /*#__PURE__*/ createElementVNode("h2", null, "Release to drop the file", -1 /* HOISTED */);
const _hoisted_5$1 = { key: 1 };
const _hoisted_6$1 = ["src"];
var script$1 = /*#__PURE__*/ defineComponent({
    __name: 'ImageDropZone',
    props: {
        imageUrl: { type: String, required: true }
    },
    emits: ["upload"],
    setup(__props, { emit }) {
        const isDisplayDropzone = ref(false);
        const handleDroppedFiles = (files) => {
            if (files.length > 0) {
                emit('upload', files.item(0));
                isDisplayDropzone.value = false;
            }
        };
        const changeImage = () => {
            isDisplayDropzone.value = true;
        };
        const cancelChange = () => {
            isDisplayDropzone.value = false;
        };
        return (_ctx, _cache) => {
            return (openBlock(), createElementBlock("div", null, [
                (isDisplayDropzone.value)
                    ? (openBlock(), createElementBlock("div", _hoisted_1$1, [
                        createVNode(script$3, { onDroppedFiles: handleDroppedFiles }, {
                            default: withCtx(() => [
                                _hoisted_2$1,
                                _hoisted_3$1
                            ]),
                            dragging: withCtx(() => [
                                _hoisted_4$1
                            ]),
                            _: 1 /* STABLE */
                        }),
                        createElementVNode("button", { onClick: cancelChange }, "Cancel")
                    ]))
                    : (openBlock(), createElementBlock("div", _hoisted_5$1, [
                        (_ctx.imageUrl)
                            ? (openBlock(), createElementBlock("img", {
                                key: 0,
                                src: _ctx.imageUrl,
                                alt: "Uploaded image"
                            }, null, 8 /* PROPS */, _hoisted_6$1))
                            : createCommentVNode("v-if", true),
                        createElementVNode("button", { onClick: changeImage }, "Change Image")
                    ]))
            ]));
        };
    }
});

script$1.__file = "src/DropZone/ImageDropZone.vue";

const _hoisted_1 = { key: 0 };
const _hoisted_2 = /*#__PURE__*/ createElementVNode("h2", null, "Drop JS file here", -1 /* HOISTED */);
const _hoisted_3 = /*#__PURE__*/ createElementVNode("p", null, "or click to upload", -1 /* HOISTED */);
const _hoisted_4 = /*#__PURE__*/ createElementVNode("h2", null, "Release to drop the file", -1 /* HOISTED */);
const _hoisted_5 = { key: 1 };
const _hoisted_6 = {
    key: 0,
    src: "/path-to-your-js-icon.png",
    alt: "JS file"
};
var script = /*#__PURE__*/ defineComponent({
    __name: 'JSDropZone',
    props: {
        downloadUrl: { type: String, required: true },
        jsExists: { type: null, required: true }
    },
    emits: ["upload"],
    setup(__props, { emit }) {
        const props = __props;
        const isDisplayDropzone = ref(props.jsExists ? true : false);
        const handleDroppedFiles = (files) => {
            if (files.length > 0) {
                emit('upload', files.item(0));
                isDisplayDropzone.value = false;
            }
        };
        const download = () => {
            window.location.href = props.downloadUrl;
        };
        const changeFile = () => {
            isDisplayDropzone.value = true;
        };
        const cancelChange = () => {
            isDisplayDropzone.value = false;
        };
        return (_ctx, _cache) => {
            return (openBlock(), createElementBlock("div", null, [
                (isDisplayDropzone.value)
                    ? (openBlock(), createElementBlock("div", _hoisted_1, [
                        createVNode(script$3, { onDroppedFiles: handleDroppedFiles }, {
                            default: withCtx(() => [
                                _hoisted_2,
                                _hoisted_3
                            ]),
                            dragging: withCtx(() => [
                                _hoisted_4
                            ]),
                            _: 1 /* STABLE */
                        }),
                        (_ctx.jsExists)
                            ? (openBlock(), createElementBlock("button", {
                                key: 0,
                                onClick: cancelChange
                            }, "Cancel"))
                            : createCommentVNode("v-if", true)
                    ]))
                    : (openBlock(), createElementBlock("div", _hoisted_5, [
                        (_ctx.jsExists)
                            ? (openBlock(), createElementBlock("img", _hoisted_6))
                            : createCommentVNode("v-if", true),
                        (_ctx.jsExists)
                            ? (openBlock(), createElementBlock("button", {
                                key: 1,
                                onClick: download
                            }, "Download JS"))
                            : createCommentVNode("v-if", true),
                        (_ctx.jsExists)
                            ? (openBlock(), createElementBlock("button", {
                                key: 2,
                                onClick: changeFile
                            }, "Change"))
                            : createCommentVNode("v-if", true)
                    ]))
            ]));
        };
    }
});

script.__file = "src/DropZone/JSDropZone.vue";

export { script$2 as CSSDropZone, script$3 as DropZone, script$1 as ImageDropZone, script as JSDropZone };
