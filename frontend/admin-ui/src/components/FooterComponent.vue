<template>
    <v-footer class="footer" color="grey darken-3">
        <v-container>
            <v-row>
                <v-col class="text-center">
                    <p class="white--text">&copy; {{ new Date().getFullYear() }} - Your Website Name</p>
                </v-col>
            </v-row>
        </v-container>
    </v-footer>
</template>

  
<script lang="ts">


</script>
  
<style scoped>
.footer {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f9f9f9;
    border-top: 1px solid #e7e7e7;
}

.footer-content p {
    margin: 0;
    padding: 0;
    color: #333;
}
</style>
  