<template>
  <form @submit.prevent="handleCreatePlaylist">
    <h4>Create New Playlist</h4>
    <input type="text" required placeholder="Playlist Name" v-model="title" />
    <textarea required placeholder="Playlist Description" v-model="description"></textarea>
    <label for="upload-file">Upload Playlist Cover Image</label>
    <input type="file" src="" alt="" accept="image/*" @change="handleFileUpload" />
    <div class="error" v-if="fileError">{{ fileError }}</div>
    <button>Create</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'

const title = ref('')
const description = ref('')
const file = ref(null)
const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg']
const fileError = ref(null)

const handleFileUpload = (event) => {
  const selectedFile = event.target.files[0]
  fileError.value = null

  if (!allowedTypes.includes(selectedFile.type)) {
    fileError.value = 'Please select a valid image file (png, jpeg, jpg)'
    return
  }

  if (selectedFile) {
    file.value = selectedFile
  }
}

const handleCreatePlaylist = () => {
  console.log('Creating playlist with the following data:')
  if (!file.value) {
    fileError.value = 'Please select a valid file'
    return
  }

  
}
</script>

<style scope>
input[type='file'] {
  border: 0;
  padding: 0;
}
label {
  font-size: 12px;
  display: block;
  margin-top: 30px;
}
button {
  margin-top: 20px;
}
</style>
