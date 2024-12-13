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


// show
const show = (req, res) => {

    // query
    const sql = `SELECT * FROM movies WHERE id = ?`;
    const reviewsSql = `SELECT * FROM reviews WHERE movie_id = ? ORDER BY created_at DESC`;

    // get the ID
    const { id } = req.params;

    // connect
    connection.query(sql, [id], (err, results) => {

        // err
        if (err) return res.status(500).json({ err: "Internal server error" });
        // not found
        if (results.length === 0) return res.status(404).json({ err: "Movie not found" });

        const movieFound = results[0];

        // reviews connect
        connection.query(reviewsSql, [id], (err, results) => {

            // err
            if (err) return res.status(500).json({ err: "Internal server error" });

            const movieReview = results;

            // results
            res.json({
                movie: movieFound,
                review: movieReview
            });
        });
    });
};


// create
const create = (req, res) => {

    const { id } = req.params;
    const { vote, name, text } = req.body;

    const sql = `INSERT INTO reviews SET movie_id = ?, vote = ?, name = ?, text = ?`;

    connection.query(sql, [id, vote, name, text], (err, results) => {
        if (err) return res.status(500).json({ error: err })

        // return success
        res.json({ success: true })
    });
};


// destroy
const destroy = (req, res) => {

    const { id } = req.params
    const sql = `DELETE FROM reviews WHERE id = ?`;

    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err })
        res.json({ success: true })
    });
};



module.exports = {
    index,
    show,
    create,
    destroy
};