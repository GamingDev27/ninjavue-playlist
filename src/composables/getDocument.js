import { ref, watchEffect } from 'vue'
import { doc, onSnapshot } from 'firebase/firestore'
import { projectFirestore } from '../firebase/config'

const getDocument =  (collectionName, id) => {
  const document = ref(null)
  const error = ref(null)

  const documentRef = doc(projectFirestore, collectionName, id)
  
  const unsub = onSnapshot(
    documentRef,
    (docSnap) => {
      if (docSnap.exists()) {
        document.value = { ...docSnap.data(), id: docSnap.id }
        error.value = null
      } else {
        error.value = 'Document does not exist'
      }
    },
    (err) => {
      console.log(err.message)
      document.value = null
      error.value = 'Could not fetch the data'
    },
  )

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub())
  })

  return { document, error }
}

export default getDocument
