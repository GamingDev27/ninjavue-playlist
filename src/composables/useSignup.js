import { ref } from 'vue'
import { projectAuth } from '@/firebase/config'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'

const error = ref(null)
const isPending = ref(false)
const signUp = async (email, password, displayName) => {
  error.value = null
  isPending.value = true
  try {
    const response = await createUserWithEmailAndPassword(projectAuth, email, password)
    if (!response) {
      throw new Error('Could not complete the signup')
    }

    // update display name on firebase
    await updateProfile(response.user, { displayName })
    error.value = null
    isPending.value = false
    return response
  } catch (err) {
    isPending.value = false
    error.value = err.message
  }
}

const useSignup = () => {
  return { error, signUp, isPending }
}

export default useSignup
