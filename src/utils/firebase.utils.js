import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyA-otJS4iYpvLrYnrl35kN0ggFZIQT99Do",
  authDomain: "lunaportfolio-790ba.firebaseapp.com",
  projectId: "lunaportfolio-790ba",
  storageBucket: "lunaportfolio-790ba.appspot.com",
  messagingSenderId: "475127802794",
  appId: "1:475127802794:web:a5e295abe8ff9f953619d3",
  measurementId: "G-MVBB2XLN9L"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
