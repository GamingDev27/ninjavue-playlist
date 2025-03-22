<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="content">
    <RouterView />
  </div>
  
</template>

<style scoped>
  .content {
    margin: 0 auto;
    max-width: 1200px;
    padding: 0 20px;
  }
</style>
