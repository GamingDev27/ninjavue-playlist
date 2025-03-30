import {projectStorage} from '@/firebase/config'
import {ref} from 'vue'
import {getUser} from '@/composables/getUser'

const { user } = getUser()

const useStorage = () => {
    const error = ref(null)
    const url = ref(null)
    const filePath = ref(null)

    const uploadImage = async (file) => {
        filePath.value = `cover/${user.value.uid}/${file.name}`
        const storageRef = projectStorage.ref(filePath.value)

        try {
            const res = await storageRef.put(file)
            url.value = await res.ref.getDownloadURL()
            error.value = null
        }
        catch(err) {
            console.log(err.message);
            error.value = err.message

        }
    }
    return {error, url, filePath, uploadImage}

}

export default useStorage;