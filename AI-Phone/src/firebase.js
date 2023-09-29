// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";
import { getDatabase, ref, set, push, onValue, increment } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
import dataStructures from "./dataStructures.js";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCuQsawTzkLH0J-deSUsR95HJJ3mqvxoQY",
    authDomain: "ai-phone-6c88d.firebaseapp.com",
    projectId: "ai-phone-6c88d",
    storageBucket: "ai-phone-6c88d.appspot.com",
    messagingSenderId: "316034923432",
    appId: "1:316034923432:web:4c05de084258264bf63b9d",
    measurementId: "G-DR900YFGNY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(app);
const db = getDatabase();


const analytics = getAnalytics(app);

export { db, ref, set, push, onValue};
