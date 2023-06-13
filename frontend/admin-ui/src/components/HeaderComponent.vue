<template>
    <v-app-bar app color="indigo" dark>
        <v-toolbar-title>
            <v-img :src="logoSrc" alt="Website Logo"></v-img>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="white" @click="logout">Logout</v-btn>
    </v-app-bar>
</template>

  
<script lang="ts" setup>
const logoSrc = import.meta.env.VITE_APP_WEBSITE_LOGO
if (!logoSrc) throw new Error("VITE_APP_WEBSITE_LOGO is mandatory env param")

const logout = async () => {
    // Add your logout functionality here
    console.log('Logout functionality not implemented yet.');
}
</script>
  
<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
    background-color: #f9f9f9;
    align-items: center;
}

.logo img {
    max-width: 150px;
    max-height: 50px;
}

.logout-button {
    margin-left: auto;
}
</style>
  