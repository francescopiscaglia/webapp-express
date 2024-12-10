const NotFound = (res, req, next) => {
    res.status(404).json({ error: "Not found" });
};

module.exports = NotFound