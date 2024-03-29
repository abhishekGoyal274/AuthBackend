const jwt = require("jsonwebtoken");
function auth(req, res, next) {
    try {
        // console.log(req.cookies.token);
        if (!req.cookies.token) return res.status(401).json({ errorMessage: "Unautherised" });
        const verified = jwt.verify(req.cookies.token, process.env.JWT_SECRET)
        req.userId = verified.user;
        next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({ errorMessage: "Unautherised" });
    }
}

module.exports = auth;