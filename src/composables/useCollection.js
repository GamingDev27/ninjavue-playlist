import { ref } from 'vue'
import { collection, addDoc } from 'firebase/firestore'
import { projectFirestore } from '../firebase/config'

const useCollection = (collectionName) => {
  const error = ref(null)
  const isPending = ref(false)
  const addDocument = async (doc) => {
    error.value = null
    isPending.value = true
    try {
      const colRef = collection(projectFirestore, collectionName)
      await addDoc(colRef, doc)
      isPending.value = false
      return colRef
    } catch (err) {
      console.log(err.message)
      isPending.value = false
      error.value = 'could not send the message'
    }
  }

  return { error, addDocument, isPending }
}

export default useCollection
