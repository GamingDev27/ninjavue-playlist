import { ref } from 'vue'
import { doc, deleteDoc } from 'firebase/firestore'
import { projectFirestore } from '../firebase/config'

const useDocument = (collectionName, id) => {
  const isPending = ref(false)
  const error = ref(null)

  let documentRef = doc(projectFirestore,collectionName, id)
  
  const deleteDocument = async () => {
    isPending.value = true
    error.value = null;

    try {
        const res = await deleteDoc(documentRef)
        isPending.value = false
        return res
    } 
    catch(err){
        console.log(err.message)
        isPending.value = false
        error.value = 'Could not delete document'
    }

  }

  return { isPending, error, deleteDocument }
}

export default useDocument
