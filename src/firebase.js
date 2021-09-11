import firebase from "firebase"
// // import "firebase/auth";
// // import "firebase/firestore";
// // import "firebase/storage";
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDPzP1cDHy_Ir_KUeyRpsF9Vtj33n8p4OM",
  authDomain: "authentication-4d4c4.firebaseapp.com",
  projectId: "authentication-4d4c4",
  storageBucket: "authentication-4d4c4.appspot.com",
  messagingSenderId: "1075759606787",
  appId: "1:1075759606787:web:b8311192db29a03cf23236"
};
firebase.initializeApp(firebaseConfig);

 const auth = firebase.auth();
 const firestore=firebase.firestore();
 export const database={
   users:firestore.collection("users"),
   posts:firestore.collection("posts"),
   comments:firestore.collection("comments"),
   getCurrentTimeStamp:firebase.firestore.FieldValue.serverTimestamp
 }
//  console.log(auth);

 export default auth

 export const storage = firebase.storage();



