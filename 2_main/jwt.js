const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req , res , next) =>{

    const authorization = req.headers.authorization
    if(!authorization) return res.status(401).json({error : "Token not found"})

    // Extract jwt token from the request headers (authorization)
    const token = req.headers.authorization.split(' ')[1];

    // If token not found
    if(!token) return res.status(401).json({error : "Unauthorized"})
    
    try{
        //Verify the jwt token
        const decoded = jwt.verify(token , process.env.JWT_SECRET); // will return payload

        // Attach user information to the request object
        req.user = decoded
        next()

    }catch(err){
        console.error(err)
        res.status(401).json({error: "Invalid token"})
    }
}

// Function to generate JWT Token
const generateToken = (userData)=>{
    // Genrate a new JWT token using user data
    return jwt.sign(userData , process.env.JWT_SECRET)
    // return jwt.sign(userData , process.env.JWT_SECRET ,{expiresIn : 10} )
}

module.exports = {jwtAuthMiddleware , generateToken}
