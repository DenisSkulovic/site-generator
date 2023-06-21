<template>
    <div>
        <v-btn :disabled="$props.disabled" color="red" dark @click="state.dialog = true">
            Delete Version
        </v-btn>    

        <v-dialog v-model="state.dialog" max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">Confirm Version Deletion</span>
                </v-card-title>

                <v-card-text>
                    Are you sure you want to delete this version?
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" type="text" @click="state.dialog = false">
                        Cancel
                    </v-btn>
                    <v-btn color="red darken-1" type="text" @click="deleteVersion">
                        Delete
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue"
import { handleDeleteVersionClick } from "@/logic/handlers"
import type { PageVersion } from "../../../../page_cls_module/build_browser";

const emit = defineEmits<{
    (e: "refreshData"): void
}>();

const props = defineProps<{
    pageVersion: PageVersion
    disabled: boolean
}>()

const state = reactive({
    dialog: false,
})

const deleteVersion = async () => {
    // Assumes that you have the path of the page to delete. Update it as per your needs.
    const isSuccess = await handleDeleteVersionClick(props.pageVersion)
    if (isSuccess) {
        emit('refreshData');
        state.dialog = false;
    }
}
</script>
