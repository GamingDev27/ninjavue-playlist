import { ref } from 'vue';
import { projectAuth } from '../firebase/config';
import { signOut } from "firebase/auth";

const error = ref(null);
const isPending = ref(false);
const logout = async () => {
    error.value = null;
    isPending.value = true;
    try {
        await signOut(projectAuth);
        isPending.value = false;
    } catch (err) {
        isPending.value = false;
        error.value = err.message;
        
    }
};

const useLogout = () => {   
    return {error, logout, isPending}
}

export default useLogout;