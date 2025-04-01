
<template>
  <main>
    <div class="home">
      <div v-if="error" class="error">Could not fetch the data</div>
      <div v-if="playlists">
        <ListView :playlists="playlists" />
      </div>
    </div>
  </main>
</template>

<script setup>
import getCollection from '@/composables/getCollection'
import ListView from '@/components/ListView.vue'

const { documents: playlists, error } = getCollection('playlists')

</script>

<style scoped>
</style>