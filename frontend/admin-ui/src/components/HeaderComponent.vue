<template>
    <header class="header">
        <div class="logo">
            <!-- Place your logo here -->
            <img :src="logoSrc" alt="Website Logo">
        </div>

        <div class="logout-button">
            <button @click="logout">Logout</button>
        </div>
    </header>
</template>
  
<script lang="ts" setup>
const logoSrc = process.env.VITE_APP_WEBSITE_LOGO
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
  