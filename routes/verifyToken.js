const jwt = require("jsonwebtoken");

module.exports = (req, res, next) =>{
    // if(!token) return res.status(401).send("Access Denied");
    
    try{
        const token = req.headers.authorization.split(' ')[1];;
        // const token = req.header("auth-token");
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        // req.userId = {_id : verified._id};
        req.user = verified;
        next();
    }
    catch (error){
        res.status(400).send("Invalid Token");
    }
};