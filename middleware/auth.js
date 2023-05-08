import jwt from 'jsonwebtoken';

const verifyLogin = async(req,res,next) => {
    try {
        // const token = req.cookies.access_token;
        // if(!token) throw new Error("Unauthorized")
        
        const token2 = req.headers.authorization
        
        if(!token2) throw new Error("Unauthorized")
        // console.log(token2);
        
        const decoded = jwt.verify(token2, process.env.ACCESS_TOKEN)

        req.user = decoded

        next()
    } catch (error) {
        res.json({
            message: error.message
        })
    }
}

export default {
    verifyLogin
}