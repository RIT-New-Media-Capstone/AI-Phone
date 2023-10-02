// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";
import { getFirestore, doc, collection, getDocs, setDoc, addDoc } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js'

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
const db = getFirestore(app);

const testData = {
    id: "game3",
    players: ["p1", "p2",],
    currentRound: 1,
    totalRounds: 3,
    guesses: [
        {
            round: 1,
            guess: "guess1"
        },
        {
            round: 2,
            guess: "guess2"
        }
    ],
    drawings: [
        {
            round: 1,
            player: "player1",
            drawing: [
                {
                    "mouseX": [], 
                    "mouseY": [], 
                    "time": []
                },
                {
                    "mouseX": [], 
                    "mouseY": [], 
                    "time": []
                },
            ]
        },
        {
            round: 2,
            player: "player2",
            drawing: [
                {
                    "mouseX": [], 
                    "mouseY": [], 
                    "time": []
                },
                {
                    "mouseX": [], 
                    "mouseY": [], 
                    "time": []
                },
            ]
        }
    ]
}

const getData = async () => {
    const docRef = await getDocs(collection(db, "drawingStructure"));
    docRef.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
    });
}

const addData = async (data) => {
    try {
        const docRef = await setDoc(doc(db, "drawingStructure", data.id), data);
        console.log("Document written with ID: ", data.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

// getData();
addData(testData);
getData();



// const analytics = getAnalytics(app);

export { db };
