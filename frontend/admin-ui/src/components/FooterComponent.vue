<template>
    <footer class="footer">
        <div class="footer-content">
            <p>&copy; {{ new Date().getFullYear() }} - Your Website Name</p>
        </div>
    </footer>
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
  