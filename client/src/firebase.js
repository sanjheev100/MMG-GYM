import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: 'AIzaSyBqn251mp2s4vOPH0J4HFTILdvmZa56eho',
  authDomain: 'mmg-gym.firebaseapp.com',
  projectId: 'mmg-gym',
  storageBucket: 'mmg-gym.appspot.com',
  messagingSenderId: '844284307831',
  appId: '1:844284307831:web:c76da845f11c24f3a45972',
}

// Initialize Firebase
// const app = initializeApp(firebaseConfig)
firebase.initializeApp(firebaseConfig)

export const authen = firebase.auth()

export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
