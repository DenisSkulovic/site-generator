<template>
    <v-dialog v-model="dialog" persistent max-width="300">
        <v-card>
            <v-card-title>
                <span class="text-h5">Create New Version</span>
            </v-card-title>
            <v-card-text>
                <v-text-field v-model="tag" label="Tag" autofocus></v-text-field>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" type="text" @click="dialog = false">Close</v-btn>
                <v-btn color="blue darken-1" type="text" @click="createTag">Create</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
  
<script lang="ts" setup>
import { ref } from "vue";

interface Props { }

const emit = defineEmits<{
    (e: "create-tag", tag: string): void
}>();

const dialog = ref(false);
const tag = ref("");

const createTag = () => {
    emit("create-tag", tag.value);
    dialog.value = false;
};

</script>