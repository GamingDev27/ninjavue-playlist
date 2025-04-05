<template>
  <form @submit.prevent="handleCreatePlaylist">
    <h4>Create New Playlist</h4>
    <input type="text" required placeholder="Playlist Name" v-model="title" />
    <textarea required placeholder="Playlist Description" v-model="description"></textarea>
    <label for="upload-file">Upload Playlist Cover Image</label>
    <input type="file" src="" alt="" accept="image/*" @change="handleFileUpload" />
    <div class="error" v-if="fileError">{{ fileError }}</div>
    <button :class="{ disabled: isPending }" :disabled="isPending">
      {{ isPending ? 'Saving...' : 'Create' }}
    </button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import useStorage from '@/composables/useStorage'
import getUser from '@/composables/getUser'
import useCollection from '@/composables/useCollection'
import { timestamp } from '@/firebase/config'
import { useRouter } from 'vue-router'

const title = ref('')
const description = ref('')
const file = ref(null)
const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp']
const fileError = ref(null)

const { url, filePath, uploadImage } = useStorage()
const { user } = getUser()
const { addDocument, error } = useCollection('playlists')
const isPending = ref(false)
const router = useRouter()


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

const handleCreatePlaylist = async () => {
  isPending.value = true
  if (!file.value) {
    fileError.value = 'Please select a valid file'
    return
  }

  await uploadImage(file.value, filePath.value)
  const res = await addDocument({
    title: title.value,
    description: description.value,
    userId: user.value.uid,
    coverImage: url.value,
    filePath: filePath.value,
    songs: [],
    createdBy: user.value.displayName,
    createdAt: timestamp(),
  })

  isPending.value = false
  if (error.value) {
    console.log(error.value)
    console.log('Failed to insert record')
  }
  console.log('File uploaded successfully')
  resetFields()
  console.table(res.id)
  router.push({name: 'playlist-details', params:{id: res.id}})
}

const resetFields = () => {
  title.value = ''
  description.value = ''
  file.value = null
  fileError.value = null
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

.disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
