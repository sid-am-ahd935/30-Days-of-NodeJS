const webSocket = require(('ws'));
const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);
const webSocketServer = new webSocket.Server({server});


app.get("/websocket", (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

webSocketServer.on('connection', (ws) => {
    ws.on('message', (message) => {
        message = message.toString('utf-8');
        ws.send(message);
    });
});

const port = "8000";
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});