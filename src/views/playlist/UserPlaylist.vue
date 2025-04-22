<template>
  <h2>My Playlist</h2>
  <div class="playlist">
    <div v-if="error" class="error">Could not fetch the data</div>
    <div v-if="playlists">
      <ListView :playlists="playlists" />
    </div>
  </div>
  <router-link :to="{ name: 'create-playlist' }" class="btn">Create New Playlist</router-link>
</template>

<script setup>
import getCollection from "@/composables/getCollection";
import getUser from "@/composables/getUser";
import ListView from "@/components/ListView.vue";

const { user } = getUser();
const { documents: playlists, error } = getCollection('playlists', ["userId","==",user.value.uid]);

console.log(playlists);
</script>

<style>

</style>