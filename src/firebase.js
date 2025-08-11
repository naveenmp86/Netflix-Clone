import { initializeApp } from "firebase/app";
import { 
  createUserWithEmailAndPassword, 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut 
} from "firebase/auth";
import { 
  addDoc, 
  getFirestore, 
  collection 
} from "firebase/firestore";

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
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

const logout = () => {
  signOut(auth);
};

export { auth, db, login, signup, logout };
