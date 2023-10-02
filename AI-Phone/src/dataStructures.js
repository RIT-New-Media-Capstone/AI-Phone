// Model class
class gameStructure {
    constructor(id, players, currentRound, totalRounds, guesses, drawings) {
        Object.assign(this, { id, players, currentRound, totalRounds, guesses, drawings });
    }
}

export default {gameStructure}

/*
gameStructure
{
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
                [["mouseX"], ["mouseY"], ["time"]],
                [["mouseX"], ["mouseY"], ["time"]],
            ]
        },
        {
            round: 2,
            player: "player2",
            drawing: [
                [["mouseX"], ["mouseY"], ["time"]],
                [["mouseX"], ["mouseY"], ["time"]],
            ]
        }
    ]
}
*/