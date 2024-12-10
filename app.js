const express = require("express");
const app = express();

const PORT = process.env.PORT || 3009;
const HOST = process.env.HOST || "http://localhost";


// start the server
app.listen(PORT, () => {
    console.log(`server is running at ${HOST}:${PORT}`)
});

// index
app.get("/", (req, res) => {
    res.send("Hello World");
});