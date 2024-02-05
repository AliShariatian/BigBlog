import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyBofBX_uZgcWyY3bLJdol225i1bT4Vm-OY",
   authDomain: "big-blog-94d42.firebaseapp.com",
   projectId: "big-blog-94d42",
   storageBucket: "big-blog-94d42.appspot.com",
   messagingSenderId: "519404205014",
   appId: "1:519404205014:web:fc823d9e740eec663e6a77",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// /////////////////////////////////////////////////////

// google auth

const provider = new GoogleAuthProvider();
const auth = getAuth();

export const authWithGoogle = async () => {
   let user = null;

   await signInWithPopup(auth, provider)
      .then((result) => {
         user = result.user;
      })
      .catch((err) => {
         console.log(err);
      });

   return user;
};
