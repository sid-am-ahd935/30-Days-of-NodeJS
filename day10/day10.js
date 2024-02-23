const express = require("express");
const app = express();
const path = require("path")
const port = "8000"

function staticFileServer(req, res) {
    // return res.sendFile(path.resolve(__dirname, "./public/index.html"));
    return res.sendFile(path.join(__dirname, '/public/index.html'))
}

app.get("/", staticFileServer);
app.use(express.static("public"));

app.listen(port, () => {
    console.log("Server is running on http://localhost:"+port);
});