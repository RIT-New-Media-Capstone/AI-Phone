let playerNameInput;
let roomIdInput;
let roundInput;
let enterRoombtn;

let infoPopupbtn;
let closePopupbtn;

const loginInfo={
    players:[],
};


const init = () => {
    roomIdInput = document.querySelector("#room-id-enter");
    playerNameInput = document.querySelector("#player-name-enter");
    roundInput = document.querySelector("#rounds-enter");
    enterRoombtn = document.querySelector('#enter-room-btn');
    infoPopupbtn = document.querySelector('#info-btn');
    closePopupbtn = document.querySelector('#pop-close');

    enterRoombtn.addEventListener("click", enterRoom);
    roomIdInput.addEventListener("input", updateButtonState);
    playerNameInput.addEventListener("input", updateButtonState);
    roundInput.addEventListener("input", updateButtonState);

    infoPopupbtn.addEventListener("click", displayPopup);
    closePopupbtn.addEventListener("click", displayPopup);

    updateButtonState();
};

const enterRoom = () => {
    let=playerName = playerNameInput.value;
    let=roomId = roomIdInput.value;
    let=rounds = roundInput.value;

    loginInfo.players.push(playerName);
    loginInfo.id = roomId;
    loginInfo.totalRounds = rounds;

    localStorage.setItem("id", roomId);
    localStorage.setItem("playerName", playerName);

    console.log(playerName + " " + roomId + " " + rounds);
    // Send data to Firebase

    window.location.href="index.html";
};

const updateButtonState = () => {
    enterRoombtn.disabled = roomIdInput.value.trim() === "" || playerNameInput.value.trim() === "" || roundInput.value.trim() === "";
};

const displayPopup=()=>{

    document.querySelector('#popup').classList.toggle('active');
}

window.onload = () => {
    init();
};
