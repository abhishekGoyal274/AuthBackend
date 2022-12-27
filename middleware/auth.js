const jwt = require("jsonwebtoken");
function auth(req, res, next) {
    try {
        if (!req.cookies) return req.status(401).json({ errorMessage: "Unautherised" });
        const verified = jwt.verify(req.cookies.token, process.env.JWT_SECRET)
        req.userId = verified.user;
        next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({ errorMessage: "Unautherised" });
    }
}

module.exports = auth;