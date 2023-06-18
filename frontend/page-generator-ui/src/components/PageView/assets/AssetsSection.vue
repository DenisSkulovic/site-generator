<template>
    <div>
        <v-row>
            <v-col cols="6">
                <v-btn @click="addJSAsset" block>Add Script Asset</v-btn>
            </v-col>
            <v-col cols="6">
                <v-btn @click="addLinkAsset" block>Add Link Asset</v-btn>
            </v-col>
        </v-row>
        <div v-for="(asset, asset_i) in props.assets" :key="asset_i">
            <v-divider v-if="asset_i !== 0" class="my-2"></v-divider>
            <component :is="getAssetComponent(asset.clazz)" :asset="asset" :pagePath="pagePath"
                @delete="deleteAsset(asset_i)" />
        </div>
    </div>
</template>



<script lang="ts" setup>
import type { Component } from "vue"
import ScriptAssetComp from "./ScriptAsset.vue";
import LinkAssetComp from "./LinkAsset.vue";
import { AssetService } from "@/service/AssetService";
import adminUrl from "@/state/adminUrl";
import bucketName from "@/state/bucketName";
import type { Asset, ScriptAsset, LinkAsset } from "../../../../../../page_cls_module/src";
import { editPageConfig } from "@/state/pageConfigState";
import { reactive } from "vue";
import pagePath from "@/state/pagePath"

const props = defineProps<{
    assets: Asset[]
}>()

let assetComponentMap: { [clazz: string]: Component } = {
    'ScriptAsset': ScriptAssetComp,
    'LinkAsset': LinkAssetComp,
}

const addJSAsset = (): void => {
    if (!editPageConfig.value) throw new Error("editPageConfig.value cannot be undefined")
    const assetService = new AssetService(adminUrl.value, bucketName.value, editPageConfig.value.pagePath)
    const asset: ScriptAsset = assetService.getNewJSAsset()
    props.assets.push(reactive(asset));
}
const addLinkAsset = (): void => {
    if (!editPageConfig.value) throw new Error("editPageConfig.value cannot be undefined")
    const assetService = new AssetService(adminUrl.value, bucketName.value, editPageConfig.value.pagePath)
    const asset: LinkAsset = assetService.getNewLinkAsset()
    props.assets.push(reactive(asset));
}

const getAssetComponent = (clazz: string) => {
    return assetComponentMap[clazz];
}

const deleteAsset = (index: number) => {
    props.assets.splice(index, 1);
}

</script>