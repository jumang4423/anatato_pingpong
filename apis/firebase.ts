import firebase from 'firebase'
import * as admin from "firebase-admin"
import 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyDH-qkNCSIjXqmUgWRA5gwq350A7DEQ9ak",
    authDomain: "anatato-pingpong.firebaseapp.com",
    databaseURL: "https://anatato-pingpong-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "anatato-pingpong",
    storageBucket: "anatato-pingpong.appspot.com",
    messagingSenderId: "1001293858819",
    appId: "1:1001293858819:web:544df8c3ab92b05b576636"
}

let database: any

//１回目の場合
if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig)
    database = firebase.database()
}
//２回目以降の場合
else {
    database = firebase.database()
}

export default database