import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDyCBfcUUSy3ifEybcNaaiuHGmHzv2FsM4",
  authDomain: "kimd-firegram.firebaseapp.com",
  projectId: "kimd-firegram",
  storageBucket: "kimd-firegram.appspot.com",
  messagingSenderId: "696295208301",
  appId: "1:696295208301:web:2490dff08f3fc397bb9664",
};

// Initialize Firebase

initializeApp(firebaseConfig);

const projectStorage = getStorage();
const projectFirestore = getFirestore();

export { projectStorage, projectFirestore };
