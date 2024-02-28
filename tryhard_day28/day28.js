const ws = require('ws');
const webSocketServer = ws.WebSocketServer;
const express = require('express');
const http = require('http');
const path = require("path");

const app = express();
const server = http.createServer(app);

app.use(express.static(path.join(__dirname, '/public')));
app.get("/", (req, res) => {
    console.log(path.join(__dirname, '/public/index.html'))
    return res.sendFile(path.join(__dirname, '/public/index.html'));
});

const wss = new webSocketServer({server});
wss.on('connection', (client) => {
    console.log('Client connected!');
    client.on('message', (msg) => {
        msg = msg.toString('utf-8');
        console.log(`Message: ${msg}`);
        broadcast(msg);
    });
});

function broadcast(msg) {
    console.log("Broadcasted message:", msg, "for clients", wss.clients);
    for(const client of wss.clients) {
        if(client.readyState === ws.OPEN) {
            client.send(msg);
        }
    }
}

const port = "8000";
app.listen(port, () => {
    console.log(`This server is running on http://localhost:${port}`);
});