const express = require("express");
const app = express();
const FilmsRouter = require("./routes/films.js");
const NotFound = require("./middlewares/NotFound.js");
const ServerErrors = require("./middlewares/ServerErrors.js");
const cors = require("cors");

const PORT = process.env.PORT || 3009;
const HOST = process.env.HOST || "http://localhost";

app.use(cors());
app.use(express.json());


// start the server
app.listen(PORT, () => { console.log(`server is running at ${HOST}:${PORT}`) });

// routers
app.use("/api/films", FilmsRouter);

// Not found middleware
app.use(NotFound);

// server middleware
app.use(ServerErrors);

