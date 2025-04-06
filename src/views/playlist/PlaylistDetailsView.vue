<template>
  <h2>Hey Ho</h2>
  <div v-if="error" class="error">Could not fetch the data</div>
  <div v-if="playlist" class="playlist-details">
    <!-- Playlist information -->
    <div class="playlist-info">
      <div class="cover">
        <img :src="playlist.coverImage" />
      </div>
      <h2>{{ playlist.title }}</h2>
      <p class="username">Created By: {{ playlist.createdBy }}</p>
      <p class="description">{{ playlist.description }}</p>
      <button v-if="isOwned" :disabled="isPending" @click="handleDelete">
        {{ isPending ? 'Deleting...' : 'Delete Playlist' }}
      </button>
    </div>

    <!-- songlist -->
    <div class="song-list">
      <div v-if="!playlist.songs.length">No songs have been added to this playlist yet</div>

      <div v-for="song in playlist.songs" :key="song.id" class="single-song">
        <div class="details">
          <div class="song-details">
            <h3>{{ song.title }}</h3>
            <p>{{ song.artist }}</p>
          </div>
          <button v-if="isOwned" @click="handleSongDelete(song.id)">X</button>
        </div>
      </div>

      <AddSong v-if="isOwned" :playlist="playlist" />
    </div>
  </div>
</template>

<script setup>
import AddSong from '@/components/AddSong.vue'
import useStorage from '@/composables/useStorage'
import useDocument from '@/composables/useDocument'
import getDocument from '@/composables/getDocument'
import getUser from '@/composables/getUser'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const { user } = getUser()
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})

const router = useRouter()
const { document: playlist, error } = getDocument('playlists', props.id)
const { deleteDocument, error: delError, isPending, updateDocument } = useDocument('playlists', props.id)
const { deleteImg } = useStorage()

const isOwned = computed(() => {
  return playlist.value && user.value && user.value.uid == playlist.value.userId ? true : false
})

const handleDelete = async () => {
  await deleteImg(playlist.value.filePath)
  await deleteDocument('playlist', playlist.value.id)

  router.push({ name: 'home' })
}

const handleSongDelete = async(songId) => {
  
  const updatedSongs = playlist.value.songs.filter(song => song.id != songId)
  await updateDocument({
    songs: updatedSongs,
  }) 
}
</script>

<style>
.playlist-details {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 80px;
}
.cover {
  overflow: hidden;
  border-radius: 20px;
  position: relative;
  padding: 160px;
}
.cover img {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
.playlist-info {
  text-align: center;
}
.playlist-info h2 {
  text-transform: capitalize;
  font-size: 28px;
  margin-top: 20px;
}
.playlist-info p {
  margin-bottom: 20px;
}
.username {
  color: #999;
}
.description {
  text-align: left;
}

.single-song {
  align-items: center;
  border-bottom: 1px dashed var(--secondary);
  margin-bottom: 20px;
}

.details {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
