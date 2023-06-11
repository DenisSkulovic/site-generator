<template>
    <div>
        <button @click="addAsset">Add Asset</button>
        <div v-for="(asset, asset_i) in props.assets" :key="asset_i">
            <LineComp v-if="asset_i !== 0" class="my-2"></LineComp>
            <component :is="getAssetComponent(asset.clazz)" :asset="asset" @change="updateAsset(asset_i, $event)"
                @delete="deleteAsset(asset_i)" />
        </div>
    </div>
</template>


<script lang="ts" setup>
import type { Component } from "vue"
import LinkAssetComp from "./LinkAsset.vue";
import ScriptAssetComp from "./ScriptAsset.vue";
import StyleAssetComp from "./StyleAsset.vue";
import { AssetRelEnum, type Asset, LinkAsset } from "@page_cls_module";

const props = defineProps<{
    assets: Asset[]
}>()

let assetComponentMap: { [clazz: string]: Component } = {
    'LinkAsset': LinkAssetComp,
    'ScriptAsset': ScriptAssetComp,
    'StyleAsset': StyleAssetComp,
}

const addAsset = () => {
    props.assets.push(new LinkAsset("", "", AssetRelEnum.ICON)); // change this to add default asset of your choice
}

const getAssetComponent = (clazz: string) => {
    return assetComponentMap[clazz];
}

const updateAsset = (index: number, asset: Asset) => {
    props.assets[index] = asset;
}
const deleteAsset = (index: number) => {
    props.assets.splice(index, 1);
}

</script>