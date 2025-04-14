
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { addDoc, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDsJjKB6A6TzzoJyBTjOJECUHBqebgCXqM",
  authDomain: "netflix-clone-ac161.firebaseapp.com",
  projectId: "netflix-clone-ac161",
  storageBucket: "netflix-clone-ac161.firebasestorage.app",
  messagingSenderId: "537800290573",
  appId: "1:537800290573:web:fde35be449d5ac4efb0044"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db=getFirestore(app);

const signup = async (name, EmailAuthCredential, password) => {
    try{
        await createUserWithEmailAndPassword(auth, EmailAuthCredential,password);
        const user=resizeBy.user;
        await addDoc(collection(db,"user"),{
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        })
    }catch(error){
        console.log(error);
        alert(error);
    }
}

const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }
  
  const logout = () => {
    signOut(auth);
  }
  
  export { auth, db, login, signup, logout };
  