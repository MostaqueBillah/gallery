import { initializeApp } from "@firebase/app";
import { getFirestore, serverTimestamp } from "@firebase/firestore";
import { getStorage } from "@firebase/storage";

// import { initializeApp } from "firebase/app";
// import { getFirestore, serverTimestamp } from "firebase/firestore";
// import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDIs5bTlk18h0EkpAy06YQjYV4P8XZnCr0",
  authDomain: "gallery-a29ff.firebaseapp.com",
  projectId: "gallery-a29ff",
  storageBucket: "gallery-a29ff.appspot.com",
  messagingSenderId: "360806199665",
  appId: "1:360806199665:web:73b8ef22c516766215c6d0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const projectStorage = getStorage(app);
const projectFirestore = getFirestore(app);
const timestamp = serverTimestamp;

export { projectStorage, projectFirestore, timestamp };
