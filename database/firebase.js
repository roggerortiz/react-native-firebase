import firebase from 'firebase'

import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCJctx0gQjwxrndXqcJTH4niVs2lESVzZU",
    authDomain: "react-native-firebase-bf955.firebaseapp.com",
    projectId: "react-native-firebase-bf955",
    storageBucket: "react-native-firebase-bf955.appspot.com",
    messagingSenderId: "112815614587",
    appId: "1:112815614587:web:754abdc3cb4177b91690de"
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore()

export default firebase;