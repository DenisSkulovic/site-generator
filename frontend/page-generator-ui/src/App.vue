<template>
  <div id="page-generator-app">

    <Overlay :isOpen="isLoadingAny" class="overlay-open">
      <div class="loading-gif" :style="loadingGifStyle"></div>
    </Overlay>

    <div class="content-wrapper">
      <div v-if="isJSONView" class="container">
        <JSONView></JSONView>
      </div>

      <div :class="['sidebar-wrapper', isDisplaySidebar ? 'open' : 'closed']">
        <MainSidebar></MainSidebar>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
// misc
import { onMounted, watch } from 'vue';

// logic
import mounted from "./logic/mounted"
import resetPageContent from "./logic/pageContent/resetPageContent"
import resetPageConfig from "./logic/pageConfig/resetPageConfig"
import resetPageHTMLObject from "./logic/pageHTMLObject/resetPageHTMLObject"
import setNestableConfigFromData from "./logic/nestable/setNestableConfigFromData"
import setDataFromNestableConfig from "./logic/nestable/setDataFromNestableConfig"
import renderPageHTMLObject from "./logic/generation/renderPageHTMLObject"
import unsetSelectedAreaBlockClasses from "./logic/unsetSelectedAreaBlockClasses"

// state
import {currentPageContent, newAreaContentMap} from "./state/pageContentState"
import {currentPageConfig, newAreaConfigMap} from "./state/pageConfigState"
import {currentPageHTMLObject} from "./state/pageHTMLObjectState"
import {nestableConfig, currentNestableItem} from './state/nestableState';
import idToIdMap from "./state/idToIdMap"
import isJSONView from "./state/isJSONView"
import isDisplaySidebar from "./state/isDisplaySidebar"

// components
import Overlay from './components/Overlay.vue';
import MainSidebar from './components/MainSidebar/index.vue';
import JSONView from './components/JSONView/index.vue';

// composables
import { isLoadingAny } from "./composables/useLoading"
import getIdToIdMap from './logic/getIdToIdMap';

// classes
import { NestableItemBlock } from './classes/NestableItemBlock';
import { NestableItemArea } from './classes/NestableItemArea';


// CSS styles URL
const loadingGif = "" // Temporary URL

const loadingGifStyle = {
  backgroundImage: `url(${loadingGif})`,
  width: '150px',
  height: '150px'
};



const resetNewItemMaps = () => {
  newAreaConfigMap.value = new Map()
  newAreaContentMap.value = new Map()
}
const resetIdToIdMap = () => {
  idToIdMap.value = getIdToIdMap(currentPageContent.value)
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
    if (!currentPageHTMLObject.value) throw new Error("currentPageHTMLObject.value cannot be undefined")
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


<style scoped lang="scss">
@import '../node_modules/bootstrap/scss/bootstrap';

#page-generator-app {
  background-color: gray;
}

.overlay-open {
  top: 0;
  left: 0;
  background: rgba(23, 62, 103, 0.65);
  z-index: 9999;
}

.content-wrapper {
  background-color: white;
}

.sidebar-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  width: 600px;
  background-color: white;
  height: 100vh;
  box-shadow: 0px 0px 8px 0px grey;
  transform: translateX(100%);
  &.open {
    transform: translateX(0);
  }
}

</style>

<style>

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

</style>