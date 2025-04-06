<template>
  <div class="navbar">
    <nav>
      <img src="@/assets/ninja.png" alt="" />
      <router-link :to="{ name: 'home' }"><h1>Ninja Playlist</h1></router-link>
      <div class="links">
        <div v-if="user">
            <router-link :to="{ name: 'create-playlist' }">Create Playlist</router-link>
            <router-link :to="{ name: 'playlist-user' }">My Playlist</router-link>
            <button v-if="!isPending" @click="handleLogout">Logout</button>
            <button v-else disabled>Loading...</button>
        </div>
        <div v-else>
            <router-link class="btn" :to="{ name: 'login' }" v-if="!user">Login</router-link>
            <router-link class="btn" :to="{ name: 'signup' }" v-if="!user">Signup</router-link>
        </div>
        
      </div>
    </nav>
  </div>
</template>

<script setup>
import useLogout from '@/composables/useLogout'
import getUser from '@/composables/getUser'
import { useRouter } from 'vue-router'

const router = useRouter()
const { user } = getUser()
const handleLogout = async () => {
  const { error, logout, isPending } = useLogout()

  const res = await logout()
  if (!error.value) {
    console.log('logout successful')
    router.push({ name: 'home' })
  }
}
</script>

<style scoped>
.navbar {
  padding: 16px 10px;
  margin-bottom: 60px;
  background: white;
}
nav {
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}
nav img {
  max-height: 60px;
}
nav h1 {
  margin-left: 20px;
}
nav .links {
  margin-left: auto;
}
nav .links a,
button {
  margin-left: 16px;
  font-size: 14px;
}
</style>
