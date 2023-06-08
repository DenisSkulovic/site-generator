<template>
    <aside class="sidebar">
        <nav>
            <ul>
                <li>
                    <router-link :to="PagePathEnum.HOME">{{PageNameEnum.HOME}}</router-link>
                </li>
                <li>
                    <router-link :to="PagePathEnum.HEADER_FOOTER_MANAGER">{{PageNameEnum.HEADER_FOOTER_MANAGER}}</router-link>
                </li>
                <li>
                    <router-link :to="PagePathEnum.PAGES">{{PageNameEnum.PAGES}}</router-link>
                </li>
                <!-- You can add more navigation links here -->
            </ul>
        </nav>
    </aside>
</template>
  
<script lang="ts" setup>
import { PagePathEnum, PageNameEnum } from '@/router'

</script>
  
<style scoped>
.sidebar {
    width: 200px;
    background-color: #f9f9f9;
    padding: 20px;
}

.sidebar nav ul {
    list-style-type: none;
    padding: 0;
}

.sidebar nav ul li {
    margin-bottom: 15px;
}
</style>