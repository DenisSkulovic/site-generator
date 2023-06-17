<template>
    <div>
        <v-btn :color="isPublished ? 'orange' : 'green'" dark @click="state.dialog = true">
            {{ isPublished ? 'Unpublish' : 'Publish' }}
        </v-btn>

        <v-dialog v-model="state.dialog" max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">{{ isPublished ? 'Unpublish' : 'Publish' }} Page</span>
                </v-card-title>

                <v-card-text>
                    Are you sure you want to {{ isPublished ? 'unpublish' : 'publish' }} this page?
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" type="text" @click="state.dialog = false">
                        Cancel
                    </v-btn>
                    <v-btn :color="isPublished ? 'orange' : 'green'" type="text" @click="togglePublishStatus">
                        {{ isPublished ? 'Unpublish' : 'Publish' }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue"
import { handlePublishUnpublishPageClick } from "@/logic/handlers"

const props = defineProps<{
    isPublished: boolean,
    path: string,
}>()

const emit = defineEmits<{
    (e: "refreshData"): void
}>();

const state = reactive({
    dialog: false,
})

const togglePublishStatus = async () => {
    const newStatus = !props.isPublished;
    await handlePublishUnpublishPageClick(props.path, newStatus)
    state.dialog = false;
    emit('refreshData');
}
</script>
