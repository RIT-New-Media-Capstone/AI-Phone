// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";
import { getFirestore, doc, collection, getDocs, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js'

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
    id: "game2",
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
                    "x": 5,
                    "y": 10,
                },
                {
                    "x": 15,
                    "y": 20,
                },
            ]
        },
        {
            round: 2,
            player: "player2",
            drawing: [
                {
                    "x": 25,
                    "y": 30,
                },
                {
                    "x": 35,
                    "y": 40,
                },
            ]
        }
    ]
}

// returns value of a specific key
// takes an id and the key of what to get
const getGameData = async (game, key) => {
    const docRef = doc(db, "gameStructure", game);
    const docSnap = await getDoc(docRef);
    let gameData;
    if (docSnap.exists()) {
        gameData = docSnap.data();
        console.log(`Document ${key}:`, gameData[key]);
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }
    return gameData[key];
}

// returns the drawing data for a round
const getDrawing = async (game, round) => {
    const gameData = await getGameData(game, "drawings");
    console.log(`${game} round ${round} drawing:`, gameData[round - 1]["drawing"]);
    return gameData[round - 1]["drawing"]
}

// returns the guess data for a round
const getGuess = async (game, round) => {
    const gameData = await getGameData(game, "guesses");
    console.log(`${game} round ${round} guess:`, gameData[round - 1]["guess"]);
    return gameData[round - 1]["guess"]
}




// takes an id, key of what to change, and new value
const updateGameData = async (game, key, value) => {
    const docRef = doc(db, "gameStructure", game);
    const newVal = {};
    newVal[key] = value
    await updateDoc(docRef, newVal);
}
// returns the drawing data for a round
const addPlayer = async (game, value) => {
    const docRef = doc(db, "gameStructure", game);

    // Adds a new drawing to the drawings array field
    // arrayUnion() adds elements to an array but only elements not already present
    await updateDoc(docRef, {
        players: arrayUnion(value)
    });
}

// adds a new object with drawing data
const addDrawingData = async (game, value, round, player) => {
    const docRef = doc(db, "gameStructure", game);

    const newObj = {
        round: round,
        player: player,
        drawing: value
    }

    // Adds a new drawing to the drawings array field
    // arrayUnion() adds elements to an array but only elements not already present
    await updateDoc(docRef, {
        drawings: arrayUnion(newObj)
    });
}
// adds a new object with drawing data
const addGuessData = async (game, value, round) => {
    const docRef = doc(db, "gameStructure", game);

    const newObj = {
        round: round,
        guess: value
    }

    // Adds a new drawing to the drawings array field
    // arrayUnion() adds elements to an array but only elements not already present
    await updateDoc(docRef, {
        guesses: arrayUnion(newObj)
    });
}

// gets all drawing data
const getData = async () => {
    const docRef = await getDocs(collection(db, "gameStructure"));
    docRef.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
    });
}

// creates a new gameStructure
const addData = async (data) => {
    try {
        const docRef = await setDoc(doc(db, "gameStructure", data.id), data);
        console.log("Document written with ID: ", data.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}


// getData();
const test = {
    id: "game3",
    players: ["player1", ],
    currentRound: 1,
    totalRounds: 3,
};

// addData(test);
// let round1 = await getGameData("game3", "currentRound");
// console.log(round1);
// addPlayer("game3", "lewis");
// let p1 = await getGameData("game3", "players");
// addDrawingData("game3", [{ x: 29, y: 29 }, { x: 29, y: 29 }], round1, p1[0]);
// addGuessData("game3", "testing", round1);
// getGuess("game3", 1);

// updateGameData("drawing", "currentRound", 2);

// let round2 = await getGameData("game3", "currentRound");
// console.log(round2);

// addDrawingData("game3", [{ x: 69, y: 69 }, { x: 69, y: 69 }], round2, p1[1]);
// addGuessData("game3", "clown", round2);
// getGuess("game3", 2);

// getDrawing("game3", 1)


// getData();

// getGameData("game1", "drawings");
// updateGameData("game2", "id", "game2");
// addDrawingData("game2", [{ x: 429, y: 429 }, { x: 429, y: 429 }], 3, "player1")
// getGameData("game2", "id");
// updateGameData("game2", "currentRound", 2);
// getGameData("game2", "currentRound");
// getGameData("game2", "totalRounds");
// getDrawing("game1", 1)


export { db };
