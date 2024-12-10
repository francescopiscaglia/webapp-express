const ServerErrors = (err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send("Internal server error");
};

module.exports = ServerErrors