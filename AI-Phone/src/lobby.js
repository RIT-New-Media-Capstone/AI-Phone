let playerNameInput;
let roomIdInput;
let roundInput;
let enterRoombtn;


const init = () => {
    roomIdInput = document.querySelector("#room-id-enter");
    playerNameInput = document.querySelector("#player-name-enter");
    roundInput = document.querySelector("#rounds-enter");
    enterRoombtn = document.querySelector('#enter-room-btn');

    enterRoombtn.addEventListener("click", enterRoom);
    roomIdInput.addEventListener("input", updateButtonState);
    playerNameInput.addEventListener("input", updateButtonState);
    roundInput.addEventListener("input", updateButtonState);

    updateButtonState();
};

const enterRoom = () => {
    playerName = playerNameInput.value;
    roomId = roomIdInput.value;
    rounds = roundInput.value;

    console.log(playerName + " " + roomId + " " + rounds);
    // Send data to Firebase

    window.location.href="index.html";
};

const updateButtonState = () => {
    enterRoombtn.disabled = roomIdInput.value.trim() === "" || playerNameInput.value.trim() === "" || roundInput.value.trim() === "";
};

window.onload = () => {
    init();
};
