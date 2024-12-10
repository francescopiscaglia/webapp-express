const myql = require("mysql2");
const connection = myql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// connect to the database
connection.connect(err => {
    if (err) throw err;
    console.log("DB connect");
});


module.exports = connection