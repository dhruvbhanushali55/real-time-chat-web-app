const username = prompt("Enter your name:");
const socket = io();

socket.emit("new-user", username);

const input = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const messages = document.getElementById("messages");
const usersList = document.getElementById("users-list");
let typingTimer;

function sendMessage() {

    const message = input.value.trim();

    if (message === "") return;

    socket.emit("chat-message", {
        username: username,
        message: message 
    });

    input.value = "";

    socket.emit("stop-typing");
clearTimeout(typingTimer);

input.focus();
}

input.addEventListener("keydown", (event) => {
    if(event.key === "Enter"){
        sendMessage();
    }
});

input.addEventListener("input", () => {
    socket.emit("typing", username);
     clearTimeout(typingTimer);

    typingTimer = setTimeout(() => {
        socket.emit("stop-typing");
    }, 1000);
});

sendBtn.addEventListener("click", () => {
    sendMessage();
});

function displayMessage(message) {

    const messageDiv = document.createElement("div");
    const usernameElement = document.createElement("strong");
    const text = document.createElement("p");
    const time = document.createElement("small");

    usernameElement.textContent = `${message.username}:`;
text.textContent = message.message;
time.textContent = message.time;


    if(message.username === username){
        messageDiv.classList.add("my-message")
    }else{
        
        messageDiv.classList.add("other-message")
    }

    
   messageDiv.appendChild(usernameElement);
messageDiv.appendChild(text);
messageDiv.appendChild(time);
    messages.appendChild(messageDiv)
    messages.scrollTop = messages.scrollHeight;

}

socket.on("previous-messages", (messages) => {

    messages.forEach((message) => {
        displayMessage(message);
    });

});

socket.on("chat-message", (message) => {
    displayMessage(message)
});

//typing status show
const typingStatus = document.getElementById("typing-status");

socket.on("typing", (username) => {
    typingStatus.textContent = `${username} is typing...`;
});

socket.on("stop-typing", () => {
    typingStatus.textContent = "";
});

socket.on("user-joined", (message) => {
    const p = document.createElement("p");

    p.textContent = message;
    p.classList.add("system-message");

    messages.appendChild(p);
});

socket.on("user-left", (message) => {
    const p = document.createElement("p");

    p.textContent = message;
    p.classList.add("system-message");

    messages.appendChild(p);
});

socket.on("online-users", (users) => {

    usersList.innerHTML = "";

    users.forEach((user) => {

        const li = document.createElement("li");

        li.textContent = user;

        usersList.appendChild(li);

    });
    
    //online users count
    const onlineCount = document.getElementById("online-users-count");
    onlineCount.textContent = `🟢 Online (${users.length})`;

});





