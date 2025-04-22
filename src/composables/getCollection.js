import { ref, watchEffect } from 'vue'
import { collection, query, orderBy, onSnapshot, where } from 'firebase/firestore'
import { projectFirestore } from '../firebase/config'

const getCollection = (collectionName,addQuery) => {
  const documents = ref(null)
  const error = ref(null)

  let collectionRef = query(collection(projectFirestore, collectionName), orderBy('createdAt'))

  //if query is not empty, add it to the collectionRef as where clause
  if (addQuery) {
    collectionRef = query(collectionRef, where(...addQuery))
  }

  const unsub = onSnapshot(
    collectionRef,
    (snap) => {
      console.log('snap')
      let results = []
      snap.docs.forEach((doc) => {
        doc.data().createdAt && results.push({ ...doc.data(), id: doc.id })
      })

      documents.value = results
      error.value = null
    },
    (err) => {
      console.log(err.message)
      documents.value = null
      error.value = 'could not fetch the data'
    },
  )

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub())
  })

  return { documents, error }
}

export default getCollection
