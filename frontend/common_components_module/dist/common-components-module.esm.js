import { defineComponent, ref, openBlock, createElementBlock, withModifiers, renderSlot, createTextVNode, withDirectives, createElementVNode, vShow, createVNode, withCtx, createCommentVNode } from 'vue';

const _hoisted_1$3 = ["onClick"];
var script$3 = /*#__PURE__*/ defineComponent({
    __name: 'DropZone',
    emits: ["droppedFile"],
    setup(__props, { emit }) {
        const dragging = ref(false);
        const file = ref();
        const onDrop = (event) => {
            event.preventDefault();
            dragging.value = false;
            if (!event.dataTransfer) {
                return;
            }
            const files = event.dataTransfer.files;
            const fileArray = Array.from(files);
            emit("droppedFile", fileArray[0]);
        };
        const onFileChange = (event) => {
            if (event.target) {
                const files = event.target.files;
                if (files) {
                    const fileArray = Array.from(files);
                    emit("droppedFile", fileArray[0]);
                }
            }
        };
        const onButtonClick = () => {
            file.value.click();
        };
        return (_ctx, _cache) => {
            return (openBlock(), createElementBlock("div", {
                class: "dropzone",
                onDragover: _cache[0] || (_cache[0] = withModifiers(() => { }, ["prevent"])),
                onDrop: onDrop,
                onClick: withModifiers(onButtonClick, ["stop"])
            }, [
                (!dragging.value)
                    ? renderSlot(_ctx.$slots, "default", { key: 0 }, () => [
                        createTextVNode(" Drag and drop files here or click to upload ")
                    ])
                    : renderSlot(_ctx.$slots, "default", { key: 1 }, () => [
                        createTextVNode(" Release to drop the files ")
                    ]),
                withDirectives(createElementVNode("input", {
                    type: "file",
                    id: "file",
                    ref_key: "file",
                    ref: file,
                    onChange: onFileChange,
                    multiple: ""
                }, null, 544 /* HYDRATE_EVENTS, NEED_PATCH */), [
                    [vShow, false]
                ])
            ], 40 /* PROPS, HYDRATE_EVENTS */, _hoisted_1$3));
        };
    }
});

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".dropzone[data-v-018dbd86]{border:2px dashed #aaa;cursor:pointer;height:100px;padding:20px;text-align:center;transition:background-color .3s;width:100%}.dropzone[data-v-018dbd86]:hover{background-color:#f0f0f0}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkRyb3Bab25lLnZ1ZSUzRnZ1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9MDE4ZGJkODYmc2NvcGVkPXRydWUmbGFuZy5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsMkJBQ0ksc0JBQXVCLENBTXZCLGNBQWUsQ0FEZixZQUFhLENBSmIsWUFBYSxDQUNiLGlCQUFrQixDQUNsQiwrQkFBaUMsQ0FDakMsVUFHSixDQUNBLGlDQUNJLHdCQUNKIiwiZmlsZSI6IkRyb3Bab25lLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTAxOGRiZDg2JnNjb3BlZD10cnVlJmxhbmcuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiXG4uZHJvcHpvbmVbZGF0YS12LTAxOGRiZDg2XSB7XG4gICAgYm9yZGVyOiAycHggZGFzaGVkICNhYWE7XG4gICAgcGFkZGluZzogMjBweDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgdHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciAwLjNzO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogMTAwcHg7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xufVxuLmRyb3B6b25lW2RhdGEtdi0wMThkYmQ4Nl06aG92ZXIge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNmMGYwZjA7XG59XG4iXX0= */";
styleInject(css_248z);

script$3.__scopeId = "data-v-018dbd86";
script$3.__file = "src/DropZone/DropZone.vue";

const _hoisted_1$2 = { key: 0 };
const _hoisted_2$2 = /*#__PURE__*/ createElementVNode("h5", null, "Drop CSS file here", -1 /* HOISTED */);
const _hoisted_3$2 = /*#__PURE__*/ createElementVNode("p", null, "or click to upload", -1 /* HOISTED */);
const _hoisted_4$2 = /*#__PURE__*/ createElementVNode("h5", null, "Release to drop the file", -1 /* HOISTED */);
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
        const isDisplayDropzone = ref(props.cssExists ? false : true);
        const handleDroppedFile = (file) => {
            emit('upload', file);
            isDisplayDropzone.value = false;
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
                        createVNode(script$3, { onDroppedFile: handleDroppedFile }, {
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
const _hoisted_2$1 = /*#__PURE__*/ createElementVNode("h5", null, "Drop image here", -1 /* HOISTED */);
const _hoisted_3$1 = /*#__PURE__*/ createElementVNode("p", null, "or click to upload", -1 /* HOISTED */);
const _hoisted_4$1 = /*#__PURE__*/ createElementVNode("h5", null, "Release to drop the file", -1 /* HOISTED */);
const _hoisted_5$1 = { key: 1 };
const _hoisted_6$1 = ["src"];
var script$1 = /*#__PURE__*/ defineComponent({
    __name: 'ImageDropZone',
    props: {
        imageUrl: { type: String, required: true }
    },
    emits: ["upload"],
    setup(__props, { emit }) {
        const props = __props;
        const isDisplayDropzone = ref(props.imageUrl ? false : true);
        const handleDroppedFile = (file) => {
            emit('upload', file);
            isDisplayDropzone.value = false;
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
                        createVNode(script$3, { onDroppedFile: handleDroppedFile }, {
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
const _hoisted_2 = /*#__PURE__*/ createElementVNode("h5", null, "Drop JS file here", -1 /* HOISTED */);
const _hoisted_3 = /*#__PURE__*/ createElementVNode("p", null, "or click to upload", -1 /* HOISTED */);
const _hoisted_4 = /*#__PURE__*/ createElementVNode("h5", null, "Release to drop the file", -1 /* HOISTED */);
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
        const isDisplayDropzone = ref(props.jsExists ? false : true);
        const handleDroppedFile = (file) => {
            emit('upload', file);
            isDisplayDropzone.value = false;
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
                        createVNode(script$3, { onDroppedFile: handleDroppedFile }, {
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
