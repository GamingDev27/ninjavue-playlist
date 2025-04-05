<template>
  <div class="add-song">
    <button v-if="!showForm" @click="showForm = true">Add Song</button>
  </div>
  <form v-if="showForm" @submit.prevent="handleSubmit">
    <div class="form-header">
        <h4 class="form-title">Add New Song</h4>
        <button class="close-btn" @click="showForm = false">X</button>
    </div>
    <input type="text" name="title" id="title" v-model="title">
    <input type="text" name="artist" id="artist" v-model="artist">
    <button>Add Song</button>
  </form>

    
</template>



<script setup>
import { ref } from 'vue';


const showForm = ref(false)
const title = ref('')
const artist = ref('')

const handleSubmit = () => {
    const newSong = {
        title: title.value,
        artist: artist.value,
        id: Math.floor(Math.random * 100000000)
    }
    
    showForm.value = false
}
</script>

<style>
.add-song {
  text-align: center;
  margin-top: 40px;
}
form {
  max-width: 100%;
  text-align: left;
}

.form-header {
    display: flex;
    justify-content: center; /* center the content */
    align-items: center;
    position: relative;
}

.form-title {
    text-align: center;
    flex-grow: 1;
}

.close-btn {
    position: absolute;
    right: 0;
    background: transparent;
    border: none;
    font-size: 1.2em;
    cursor: pointer;
}
</style>
