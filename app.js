const express = require("express");
const app = express();
const FilmsRouter = require("./routes/films.js");

const PORT = process.env.PORT || 3009;
const HOST = process.env.HOST || "http://localhost";


// start the server
app.listen(PORT, () => {
    console.log(`server is running at ${HOST}:${PORT}`)
});

// router
app.use("/api/films", FilmsRouter);

