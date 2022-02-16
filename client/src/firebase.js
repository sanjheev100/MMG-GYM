import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: 'AIzaSyDpCpCLcOty-1MstiJbRUFBCnKIKqVcUlk',
  authDomain: 'mmggym-1f401.firebaseapp.com',
  projectId: 'mmggym-1f401',
  storageBucket: 'mmggym-1f401.appspot.com',
  messagingSenderId: '699809362703',
  appId: '1:699809362703:web:b92aa9af352f221c93447a',
}

// Initialize Firebase
// const app = initializeApp(firebaseConfig)
firebase.initializeApp(firebaseConfig)

export const authen = firebase.auth()

export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
