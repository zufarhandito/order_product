import jwt from 'jsonwebtoken';

const verifyLogin = async(req,res,next) => {
    try {
        console.log(req.cookies)
        const token = req.cookies.access_token;
        if(!token) throw new Error("Unauthorized")
        
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN)

        req.user = decoded

    } catch (error) {
        res.json({
            message: error.message
        })
    }
    next()
}

export default {
    verifyLogin
}