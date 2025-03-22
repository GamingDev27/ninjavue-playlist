import { ref } from 'vue';
import { projectAuth } from '../firebase/config';
import { signInWithEmailAndPassword } from "firebase/auth";

const error = ref(null);
const isPending = ref(false);

const login = async (email, password) => {
    error.value = null;
    isPending.value = true;
    try {
        const response = await signInWithEmailAndPassword(projectAuth, email, password);
        if(!response){
            throw new Error('Could not complete the login');
        }

        isPending.value = false;
        error.value = null;
        return response;
    } catch (err) {
        error.value = err.message;
        error.value = 'Incorrect login credentials';
        isPending.value = false;
        console.log(err);
    }
};

const useLogin = () => {   
    return {error, login, isPending};
}

export default useLogin;