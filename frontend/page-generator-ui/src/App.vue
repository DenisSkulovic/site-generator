<template>
  <div id="page-generator-app" style="background-color: gray;">

    <Overlay v-if="isLoadingAny" :isTransitioning="true" :position="'fixed'" :background="'rgba(23, 62, 103, 0.65)'"
      :zIndex="9999" class="open" style="top: 0; left: 0;">
      <div class="loading-gif" :style="`background-image: url(${loadingGif}); width: 150px; height: 150px;`">
      </div>
    </Overlay>

    <div style="background-color: white;">
      <div v-if="isJSONView" class="container">
        <div class="p-3">
          <CollapseExpand :active="toggleState['config']" @toggleClick="() => handleToggleExpandable('config')">
            <template #title>
              <h3>CONFIG</h3>
            </template>
            <template #content>
              <pre>
                {{ JSON.stringify(editPageConfig.value, null, 4) }}
              </pre>
            </template>
          </CollapseExpand>
        </div>
        <div class="p-3">
          <CollapseExpand :active="toggleState['content']" @toggleClick="() => handleToggleExpandable('content')">
            <template #title>
              <h3>CONTENT</h3>
            </template>
            <template #content>
              <pre>
                {{ JSON.stringify(editPageContent.value, null, 4) }}
              </pre>
            </template>
          </CollapseExpand>
        </div>
        <div class="p-3">
          <CollapseExpand :active="toggleState['htmlObject']" @toggleClick="() => handleToggleExpandable('htmlObject')">
            <template #title>
              <h3>HTML OBJECT</h3>
            </template>
            <template #content>
              <pre>
                {{ JSON.stringify(editPageHTMLObject.value, null, 4) }}
              </pre>
            </template>
          </CollapseExpand>
        </div>
      </div>

      <div :class="isDisplaySidebar ? 'open' : 'closed'" id="sidebar-wrapper">
        <MainSidebar></MainSidebar>
      </div>
    </div>

  </div>
</template>


<script setup lang="ts">
// misc
import { onMounted, watch, reactive } from 'vue';

// logic
import mounted from "./logic/mounted"
import resetPageContent from "./logic/pageContent/resetPageContent"
import resetPageConfig from "./logic/pageConfig/resetPageConfig"
import resetPageHTMLObject from "./logic/pageHTMLObject/resetPageHTMLObject"
import setNestableConfigFromData from "./logic/nestable/setNestableConfigFromData"
import setDataFromNestableConfig from "./logic/nestable/setDataFromNestableConfig"
import renderPageHTMLObject from "./logic/generation/renderPageHTMLObject"

// state
import currentPageContent from "./state/pageContent/currentPageContent"
import currentPageConfig from "./state/pageConfig/currentPageConfig"
import currentPageHTMLObject from "./state/pageHTMLObject/currentPageHTMLObject"
import nestableConfig from './state/nestable/nestableConfig';
import newAreaConfigMap from "./state/pageConfig/newAreaConfigMap"
import newAreaContentMap from "./state/pageContent/newAreaContentMap"
import idToIdMap from "./state/idToIdMap"
import currentNestableItem from "./state/nestable/currentNestableItem"

// components
import Overlay from './components/Overlay.vue';
import MainSidebar from './components/MainSidebar/index.vue';
import CollapseExpand from './components/CollapseExpand.vue';

// composables
import { isLoadingAny } from "./composables/useLoading"
import getIdToIdMap from './logic/getIdToIdMap';

import editPageConfig from './state/pageConfig/editPageConfig';
import editPageContent from './state/pageContent/editPageContent';
import editPageHTMLObject from './state/pageHTMLObject/editPageHTMLObject';

import isJSONView from "./state/isJSONView"
import isDisplaySidebar from "./state/isDisplaySidebar"
import { NestableItemBlock } from './classes/NestableItemBlock';
import { NestableItemArea } from './classes/NestableItemArea';
import unsetSelectedAreaBlockClasses from "./logic/unsetSelectedAreaBlockClasses"


const loadingGif = "" // TEMPORARY

const toggleState = reactive({
  config: false,
  content: false,
  htmlObject: false,
})

const resetNewItemMaps = () => {
  newAreaConfigMap.value = new Map()
  newAreaContentMap.value = new Map()
}
const resetIdToIdMap = () => {
  idToIdMap.value = getIdToIdMap(currentPageContent.value)
}


const handleToggleExpandable = (name: "config" | 'content' | "htmlObject") => {
  toggleState[name] = !toggleState[name]
}





watch(
  () => [
    currentPageContent.value,
    currentPageConfig.value,
    currentPageHTMLObject.value,
  ],
  () => {
    resetNewItemMaps()
    resetIdToIdMap()
    resetPageContent()
    resetPageConfig()
    resetPageHTMLObject()
    setNestableConfigFromData()
    renderPageHTMLObject(currentPageHTMLObject.value)
  }
)

watch(
  () => nestableConfig.config,
  setDataFromNestableConfig
)
watch(
  () => currentNestableItem.value,
  async () => {
    if (currentNestableItem.value) {
      if (currentNestableItem.value instanceof NestableItemArea) {
        const el = document.querySelector(`[data-area-uuid="${currentNestableItem.value.id}"]`)
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" })
        }
      } else if (currentNestableItem.value instanceof NestableItemBlock) {
        const el = document.querySelector(`[data-block-uuid="${currentNestableItem.value.id}"]`)
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" })
        }
      }
    } else {
      unsetSelectedAreaBlockClasses()
    }
  }
)


onMounted(mounted)


</script>


<style type="text/scss" lang="scss">
/* WAS TRYING TO ISOLATE THE VUE APP FROM PAGE CSS */
/* For example "div {background: red}" on the page will also color the app divs, which is not good */
/* Page CSS can potentially break the app CSS in unexpected ways */
/* unfortunately unsetting styles breaks a lot of other things unexpectedly. For example, the dragging of blocks broke */
/* .live-editor-main-wrapper {
     all: initial;
     *:not(svg):not(path) {
         all: unset;
         display: block;
         font-family: Raleway,sans-serif;
     }
 } */

#page-generator-app {
  /* Bootstrap scoped to the vue app only */
  @import '../node_modules/bootstrap/scss/bootstrap';
}

.currently-hovered-area {
  outline: 5px solid #67171f40;
  box-shadow: 0px 0px 5px 5px #67171f40;
}

.currently-selected-area {
  outline: 5px solid #67171f;
  box-shadow: 0px 0px 5px 5px #67171f;
}

.currently-hovered-block {
  outline: 5px solid #57671740;
  box-shadow: 0px 0px 5px 5px #57671740;
}

.currently-selected-block {
  outline: 5px solid #576717;
  box-shadow: 0px 0px 5px 5px #576717;
}

#sidebar-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  width: 600px;
  background-color: white;
  height: 100vh;
  box-shadow: 0px 0px 8px 0px grey;
}

#sidebar-wrapper.closed {
  transform: translateX(100%)
}
</style>


<style scoped></style>