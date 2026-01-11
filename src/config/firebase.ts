// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBes-61BLT4nG0f7HSL8Wz4Nyfx5AtPZ9s",
  authDomain: "blog-aulas.firebasestorage.app",
  projectId: "blog-aulas",
  storageBucket: "blog-aulas.firebasestorage.app",
  messagingSenderId: "1074412737824",
  appId: "1:1074412737824:android:6b2bf072f3d51ad2e33345",
  measurementId: "G-TZ0P1WT7ZK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth, app };
