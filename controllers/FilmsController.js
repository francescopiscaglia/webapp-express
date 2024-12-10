const connection = require("../database/connection.js");


// index
const index = (req, res) => {

    // query
    const sql = `SELECT * FROM movies`;

    // connect
    connection.query(sql, (err, results) => {

        // err
        if (err) return res.status(500).json({ err: "Internal server error" });

        // not found
        if (results.length === 0) return res.status(404).json({ err: "Films not found" });

        // results
        res.json({
            films: results,
            counter: results.length
        });
    });
};

module.exports = {
    index
};