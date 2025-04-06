<template>
  <form @submit.prevent="handleSubmit">
    <h3>Login</h3>
    <input type="email" placeholder="Email" v-model="email" />
    <input type="password" placeholder="Password" v-model="password"/>
    <div class="error" v-if="error">{{ error }}</div>
    <button v-if="!isPending">Login</button>
    <button v-else disabled>Loading...</button>    
  </form>
</template>

<script setup>
import useLogin from '@/composables/useLogin'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const { error, login, isPending } = useLogin()
const email = ref('')
const password = ref('')
const router = useRouter()

const handleSubmit = async () => {
  const res = await login(email.value, password.value);
  if(!error.value){
    console.log('Login successful')
    router.push({ name: 'playlist-user' })
  }
}
</script>

<style>

</style>