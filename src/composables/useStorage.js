import { projectStorage } from '@/firebase/config'
import { ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { ref } from 'vue'
import getUser from '@/composables/getUser'

const { user } = getUser()

const useStorage = () => {
  const error = ref(null)
  const url = ref(null)
  const filePath = ref(null)

  const uploadImage = async (file) => {
    filePath.value = `cover/${user.value.uid}/${file.name}`
    const storageReference = storageRef(projectStorage, filePath.value)

    try {
      const snapshot = await uploadBytes(storageReference, file)
      console.log('File uploaded:', snapshot)
      url.value = await getDownloadURL(storageReference)
      console.log('Download URL:', url.value)
      error.value = null
    } catch (err) {
      console.log(err.message)
      error.value = err.message
    }
  }

  const deleteImg = async(path) => {
    
    const storageReference = storageRef(projectStorage, path)
    await deleteObject(storageReference).then(() => {
      console.log('Image delete successfully')
    }).catch((err) => {
      console.log(err.message)
      error.value = err.message
    })
  }

  return { error, url, filePath, uploadImage, deleteImg }
}



export default useStorage
