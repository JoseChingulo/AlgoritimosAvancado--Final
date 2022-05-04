const jwt = require("jsonwebtoken");

function verifyJWT(req, res, next) {
    const token = req.headers["authorization"];
    console.log(token);
    if (!token) return res.status(401).json({msg: "Token não foi definido"});

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err)
            return res.status(401).json({msg: "Token expirou, usuário deve autenticar novamente"});
                
        req.isAssociate = decoded.isAssociate;
        req.entityId = decoded.id;
        next();    
    });
}

module.exports = verifyJWT;