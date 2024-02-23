const webSocket = require(('ws'));
const express = require('express');
const http = require('http');
const path = require('path');

const port = "8000";
const publicPath = path.resolve(__dirname, "./public/");
const app = express();
const server = http.createServer(app);
app.use(express.static(publicPath));

function setupWebSocket(server) {
    const webSocketServer = new webSocket.Server({server});

    webSocketServer.on('connection', (client) => {
        console.log("A new client connected!");

        client.on('message', (message) => {
            client.send('Message received from your end:', message);
        });
    });
}

setupWebSocket(server);

app.get("/websocket", (req, res) => {
    return res.sendFile(__dirname + '/public/index.html');
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});