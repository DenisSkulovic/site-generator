<template>
    <div>
        <v-btn color="primary" dark @click="state.dialog = true">
            Add new page
        </v-btn>

        <div v-if="isPageExistsError">Page Exists!</div>

        <v-dialog v-model="state.dialog" max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">Add New Page for Lang: {{ lang }}</span>
                </v-card-title>

                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field v-model="state.pagePath" label="Page Path" required></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="state.dialog = false">
                        Close
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="createPage">
                        Create Page
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue"
import { handleAddNewPageClick } from "@/logic/handlers"
import lang from "@/state/lang";
import isPageExistsError from "@/state/isPageExistsError"

const state = reactive({
    dialog: false,
    pagePath: '',
})
const createPage = async () => {
    isPageExistsError.value = false
    await handleAddNewPageClick(state.pagePath, lang.value)
    state.dialog = false;
}
</script>