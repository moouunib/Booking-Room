const jwt = require("jsonwebtoken");


const verifyToken = (req, res, next) =>{
    const authHeader = req.headers.authorization || Authorization;
    if (!authHeader)
      return res.status(401).json({ message: "No token provided" });
    const token = authHeader.split(" B")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
         return res.status(403).json({ message: "Invalid token" });
    }
}

module.exports = verifyToken;