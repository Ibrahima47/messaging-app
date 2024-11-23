const socket = io('http://192.168.1.21:3000');//192.168.1.21 adresse hote

// Gestion du pseudo
const usernameModal = document.getElementById('usernameModal');
const usernameInput = document.getElementById('usernameInput');
const usernameSubmit = document.getElementById('usernameSubmit');
const chatContainer = document.getElementById('chatContainer');

usernameSubmit.addEventListener('click', () => {
    const enteredUsername = usernameInput.value.trim();
    if (enteredUsername) {
        socket.emit('setUsername', enteredUsername);
    } else {
        alert('Le pseudo ne peut pas être vide.');
    }
});

socket.on('usernameError', (errorMessage) => {
    alert(errorMessage);
});

socket.on('usernameSuccess', () => {
    usernameModal.style.display = 'none';
    chatContainer.style.display = 'block';
});

// Gestion des messages
const messageInput = document.getElementById('messageInput');
const sendMessage = document.getElementById('sendMessage');
const messages = document.getElementById('messages');

sendMessage.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message) {
        socket.emit('chatMessage', message);
        messageInput.value = '';
    }
});

socket.on('chatMessage', ({ username, text }) => {
    const messageElement = document.createElement('p');
    messageElement.textContent = `${username}: ${text}`;
    messages.appendChild(messageElement);
    messages.scrollTop = messages.scrollHeight;
});

socket.on('userConnected', (message) => {
    const info = document.createElement('p');
    info.textContent = message;
    messages.appendChild(info);
});

socket.on('userDisconnected', (message) => {
    const info = document.createElement('p');
    info.textContent = message;
    messages.appendChild(info);
});
