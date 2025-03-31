import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { useFirebaseStore } from '@/stores/firebaseStore.js'

import App from './App.vue'
import router from './router'

const firebaseConfig = {
    apiKey: "AIzaSyCbuASkmdb2O0U9P1IMu5anI0tnmFkOEhs",
    authDomain: "perfect-person-website.firebaseapp.com",
    projectId: "perfect-person-website",
    storageBucket: "perfect-person-website.firebasestorage.app",
    messagingSenderId: "29486917368",
    appId: "1:29486917368:web:43fb3d047900df773abd0d",
    measurementId: "G-1ETV4M1474"
};


const app = createApp(App)
app.use(createPinia())


// init firebase, firestore service
const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseApp)

const firebaseStore = useFirebaseStore()
firebaseStore.setFirebaseStore(db)

app.use(router)

app.mount('#app')
