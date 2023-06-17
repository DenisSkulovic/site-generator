<template>
    <div>
        <v-btn color="red" dark @click="state.dialog = true">
            Delete page
        </v-btn>    

        <v-dialog v-model="state.dialog" max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">Confirm Page Deletion</span>
                </v-card-title>

                <v-card-text>
                    Are you sure you want to delete this page?
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" type="text" @click="state.dialog = false">
                        Cancel
                    </v-btn>
                    <v-btn color="red darken-1" type="text" @click="deletePage">
                        Delete
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue"
import { handleDeletePageClick } from "@/logic/handlers"

const emit = defineEmits<{
    (e: "refreshData"): void
}>();

const state = reactive({
    dialog: false,
    path: '',
})

const deletePage = async () => {
    // Assumes that you have the path of the page to delete. Update it as per your needs.
    const isSuccess = await handleDeletePageClick(state.path)
    if (isSuccess) {
        emit('refreshData');
        state.dialog = false;
    }
}
</script>
