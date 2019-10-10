import firebase from "firebase";
require("firebase/firestore");

console.log("init firebase 1");

const firebaseConfig = {
    apiKey: "AIzaSyAGt6G7ff6ByAsaqs0vaan9eS-N5c-m2uc",
    authDomain: "meal-prep-a1e3a.firebaseapp.com",
    databaseURL: "https://meal-prep-a1e3a.firebaseio.com",
    projectId: "meal-prep-a1e3a",
    storageBucket: "",
    messagingSenderId: "1055167685864",
    appId: "1:1055167685864:web:407d2383ae1902c8c1955d",
    measurementId: "G-8D0PLFG0HZ"
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
firebase.analytics();

// db = firebase.firestore(app);

console.log("init firebase 2");
