import { ref } from 'vue';
import { projectAuth } from '../firebase/config';
import { onAuthStateChanged } from "firebase/auth";

const user = ref(projectAuth.currentUser);
//const error = ref(null);

onAuthStateChanged(projectAuth, (_user) => {
    console.log('User is logged in: ', user);
    user.value = _user;
    
});
        

const getUser = () => {   
    return {user}
}

export default getUser;