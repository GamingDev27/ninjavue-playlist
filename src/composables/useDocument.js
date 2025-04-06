import { ref } from 'vue'
import { doc, deleteDoc, updateDoc } from 'firebase/firestore'
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

  const updateDocument = async (params) => {
    isPending.value = true
    error.value = null;

    try {
        const res = await updateDoc(documentRef,params)
        isPending.value = false
        return res
    } 
    catch(err){
        console.log(err)
        isPending.value = false
        error.value = 'Could not update document'
    }

  }

  return { isPending, error, deleteDocument, updateDocument }
}

export default useDocument
