const connection = require("../database/connection.js");


// index
const index = async (req, res) => {

    // query
    const sql = `SELECT * FROM movies`;

    try {
        const [results] = await connection.promise().query(sql);

        if (results.length === 0) return res.status(404).json({ Error: "Films not found" });

        // results
        res.json({
            films: results,
            counter: results.length
        });

    } catch (error) {
        res.status(500).json({ Error: "Internal server error" });
    };
};


// show
const show = async (req, res) => {

    // query
    const sql = `SELECT * FROM movies WHERE id = ?`;
    const reviewsSql = `SELECT * FROM reviews WHERE movie_id = ? ORDER BY created_at DESC`;

    try {

        // get the ID
        const { id } = req.params;

        const [movieResults] = await connection.promise().query(sql, [id]);

        if (movieResults.length === 0) return res.status(404).json({ Error: "Movie not found" });

        const movie = movieResults[0];

        const [reviews] = await connection.promise().query(reviewsSql, [id]);

        res.status(200).json({
            movie: movie,
            review: reviews
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ Error: "Internal server error" });
    }
};


// create
const create = (req, res) => {

    const { id } = req.params;
    const { vote, name, text } = req.body;

    // data validation
    if (!vote || isNaN(vote)) {
        return res.status(400).json({ error: "Please insert a valid review vote" });
    };

    if (!name || name.length > 100) {
        return res.status(400).json({ error: "Please insert your name (max 100 characters" });
    };

    if (!text || text.length > 500) {
        return res.status(400).json({ error: "Please insert a valid review (max 500 characters" });
    };

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