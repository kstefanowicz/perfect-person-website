import { defineStore } from "pinia"
import { ref } from "vue"
import 'firebase/firestore'
import { collection, orderBy, query, getDocs, setDoc, doc } from "firebase/firestore"
import { eps } from '../data/podcastData.js'
import { v4 as uuidv4 } from 'uuid'


export const useFirebaseStore = defineStore('firebase', () => {

    const firebaseStore = ref(null)
    const episodesAll = ref([])

    const isLoading = ref(false)
    const error = ref(null)

    const setFirebaseStore = async (db) => {
        firebaseStore.value = db
        await getAllEpisodes()
    }

    const getAllEpisodes = async () => {

        isLoading.value = true
        error.value = null

        const epColRef = collection(firebaseStore.value, 'podcast-episodes')
        try {
            const q = query(epColRef, orderBy('id', 'asc'))
            const snapshot = await getDocs(q)

            let outList = []

            episodesAll.value = snapshot.docs.map((ep) =>
                outList.push(ep.data()))

            episodesAll.value = outList

        } catch (err) {
            console.error("ERROR: ", err)
            error.value = err.message
        } finally {
            isLoading.value = false
        }
    }




    return { firebaseStore, setFirebaseStore, episodesAll }
})