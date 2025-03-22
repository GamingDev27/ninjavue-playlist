<template>
  <form @submit.prevent="handleSubmit">
    <h3>Signup</h3>
    <input type="email" placeholder="Email" v-model="email" />
    <input type="password" placeholder="Password" v-model="password" />
    <input type="text" placeholder="Display Name" v-model="displayName" />
    <div class="error" v-if="error">{{ error }}</div>
    <button v-if="!isPending">Signup</button>
    <button v-else disabled>Loading...</button>
  </form>
</template>

<script setup>
import useSignup from '@/composables/useSignup'
import { ref } from 'vue'

const { error, signUp, isPending } = useSignup()
const email = ref('')
const password = ref('')
const displayName = ref('')

const handleSubmit = async () => {
  const res = await signUp(email.value, password.value, displayName.value)
  if (!error.value) {
    console.log('Signup successful')
  }
}
</script>

<style></style>
