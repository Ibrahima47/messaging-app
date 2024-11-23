const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

const users = {};

io.on('connection', (socket) => {
    console.log('Un utilisateur s\'est connecté :', socket.id);

    // Associer un pseudo à l'utilisateur
    socket.on('setUsername', (username) => {
        username = username.trim();

        if (!username) {
            socket.emit('usernameError', 'Le pseudo ne peut pas être vide.');
            return;
        }

        if (Object.values(users).includes(username)) {
            socket.emit('usernameError', 'Ce pseudo est déjà utilisé. Veuillez en choisir un autre.');
            return;
        }

        users[socket.id] = username;
        console.log(`${username} a rejoint la conversation`);

        socket.emit('usernameSuccess', username);
        socket.broadcast.emit('userConnected', `${username} a rejoint le chat`);
    });

    // Diffuser les messages de chat
    socket.on('chatMessage', (message) => {
        const username = users[socket.id] || 'Anonyme';
        io.emit('chatMessage', { username, text: message });
    });

    // Gérer la déconnexion
    socket.on('disconnect', () => {
        const username = users[socket.id];
        delete users[socket.id];
        console.log(`${username || 'Un utilisateur'} s'est déconnecté`);
        socket.broadcast.emit('userDisconnected', `${username || 'Un utilisateur'} a quitté le chat`);
    });
});

server.listen(3000, '0.0.0.0', () => {
  console.log('Serveur démarré sur le port 3000');
});
