const connection = require("../database/connection.js");


// movies index
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
        console.error(error);
        res.status(500).json({ Error: "Internal server error" });
    };
};

// categories index
const CategoriesIndex = async (req, res) => {

    // query
    const sql = `SELECT * FROM movies`;

    try {
        const [results] = await connection.promise().query(sql);

        if (results.length === 0) return res.status(404).json({ Error: "Films not found" });

        // Raggruppa i film per categoria
        const groupedByCategory = results.reduce((acc, movie) => {
            const category = movie.genre; // Usa il campo category per il raggruppamento

            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push({
                id: movie.id,
                title: movie.title
            });
            return acc;
        }, {});

        // Risposta
        res.json({
            films: groupedByCategory,
            counter: results.length
        });

    } catch (error) {
        console.error(error);
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
const create = async (req, res) => {

    try {
        const { id } = req.params;
        const { vote, name, text } = req.body;

        // data validation
        if (!vote || isNaN(vote) || vote < 1 || vote > 5) {
            return res.status(400).json({ error: "Please insert a valid review vote between 1 and 5" });
        };

        if (!name || name.length > 100) {
            return res.status(400).json({ error: "Please insert your name (max 100 characters" });
        };

        if (!text || text.length > 500) {
            return res.status(400).json({ error: "Please insert a valid review (max 500 characters" });
        };

        const sql = `INSERT INTO reviews (movie_id, vote, name, text) VALUES (?, ?, ?, ?)`;

        const [results] = await connection.promise().query(sql, [id, vote, name, text]);

        // return success
        res.status(201).json({ success: true })

    } catch (error) {
        console.error(error);
        res.status(500).json({ Error: "Internal server error" });
    };
};


// destroy
const destroy = async (req, res) => {

    try {
        const { id } = req.params
        const sql = `DELETE FROM reviews WHERE id = ?`;

        const [results] = await connection.promise().query(sql, [id]);

    } catch (error) {
        console.error(error);
        res.status(500).json({ Error: "Internal server error" })
    };
};



module.exports = {
    index,
    show,
    create,
    destroy,
    CategoriesIndex
};