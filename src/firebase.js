import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyDhzccOQ5AH8JNOs9pC5ZVXTEPHwHZt5Yg',
  authDomain: 'whatsapp-clone-ebe5e.firebaseapp.com',
  databaseURL: 'https://whatsapp-clone-ebe5e.firebaseio.com',
  projectId: 'whatsapp-clone-ebe5e',
  storageBucket: 'whatsapp-clone-ebe5e.appspot.com',
  messagingSenderId: '920422537256',
  appId: '1:920422537256:web:a0cc5e08da01fe17e5bd1d',
}

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()
export { auth, provider }
export default db
