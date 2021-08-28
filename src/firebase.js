import firebase from "firebase"
// // import "firebase/auth";
// // import "firebase/firestore";
// // import "firebase/storage";
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: "AIzaSyCVx63b1IwfAD1LCVLOZDCeF4_jA9MctrA",
  authDomain: "reel-2.firebaseapp.com",
  databaseURL: "https://reel-2-default-rtdb.firebaseio.com",
  projectId: "reel-2",
  storageBucket: "reel-2.appspot.com",
  messagingSenderId: "768189475559",
  appId: "1:768189475559:web:65e4ba2b4456f843fb9042",
  measurementId: "G-FK221DBDKP"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
// if (!firebase.apps.length) {
//   firebase.initializeApp({});
// }else {
//   firebase.app(); // if already initialized, use that one\\\
// }
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



