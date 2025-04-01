<template>
    <h2>Hey Ho</h2>
    <div v-if="error" class="error">Could not fetch the data</div>
    <div v-if="playlist" class="playlist-details">
        <!-- Playlist information -->
         <div class="playlist-info">
            <div class="cover">
                <img :src="playlist.coverImage">
            </div>
            <h2>{{ playlist.title }}</h2>
            <p class="username">Created By: {{ playlist.createdBy }}</p>
            <p class="description">{{ playlist.description }}</p>
         </div>

        <!-- songlist -->
         <div class="song-list">
            <p>song list hear</p>
         </div>
        
    </div>    
</template>

<script setup>
import getDocument from '@/composables/getDocument'


const props = defineProps({
    id: {
        type: String,   
        required: true
    }
})

const {document: playlist, error} = getDocument('playlists', props.id)
//console log the playlist title

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
</style>
