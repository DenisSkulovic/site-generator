<template>
    <div>
        <button @click="addJSAsset">Add Script Asset</button>
        <button @click="addCSSAsset">Add Style Asset</button>
        <div v-for="(asset, asset_i) in props.assets" :key="asset_i">
            <LineComp v-if="asset_i !== 0" class="my-2"></LineComp>
            <component :is="getAssetComponent(asset.clazz)" :asset="asset" @change="updateAsset(asset_i, $event)"
                @delete="deleteAsset(asset_i)" />
        </div>
    </div>
</template>


<script lang="ts" setup>
import type { Component } from "vue"
import ScriptAssetComp from "./ScriptAsset.vue";
import StyleAssetComp from "./StyleAsset.vue";
import { AssetService } from "@/service/AssetService";
import adminUrl from "@/state/adminUrl";
import bucketName from "@/state/bucketName";
import type { Asset, ScriptAsset, StyleAsset } from "../../../../../../page_cls_module/src";
import { editPageConfig } from "@/state/pageConfigState";


const props = defineProps<{
    assets: Asset[]
}>()

let assetComponentMap: { [clazz: string]: Component } = {
    'ScriptAsset': ScriptAssetComp,
    'StyleAsset': StyleAssetComp,
}

const addJSAsset = (): void => {
    if (!editPageConfig.value) throw new Error("editPageConfig.value cannot be undefined")
    const assetService = new AssetService(adminUrl.value, bucketName.value, editPageConfig.value.pagePath)
    const asset: ScriptAsset = assetService.getNewJSAsset()
    props.assets.push(asset);
}
const addCSSAsset = (): void => {
    if (!editPageConfig.value) throw new Error("editPageConfig.value cannot be undefined")
    const assetService = new AssetService(adminUrl.value, bucketName.value, editPageConfig.value.pagePath)
    const asset: StyleAsset = assetService.getNewCSSAsset()
    props.assets.push(asset);
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