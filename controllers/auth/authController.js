import models from "../../models/init-models.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

// const verifyLogin = async(req,res,next) => {
//     try {
//         const token = req.cookies.access_token;
//         // const token2 = req.headers.authorization;
//         // console.log(token2);
//         if(!token) throw new Error("Unauthorized")
        
//         jwt.verify(token, process.env.ACCESS_TOKEN)
//         next()
//     } catch (error) {
//         res.json({
//             message: error.message
//         })
//     }
// }

const loginHandler = async(req,res) => {
    try {
        if(!req.body.username) throw new Error("Username kosong")
        if(!req.body.password) throw new Error("Password kosong")
        const data = await models.users.findOne({
            where: {
                username: req.body.username
            }
        })
        if(!data) throw new Error("User tidak ditemukan")

        const {username, password} = data

        const matchPassword = await bcrypt.compare(req.body.password,password)
        if(!matchPassword) throw new Error("Password salah")

        const accessToken = jwt.sign({username: username},process.env.ACCESS_TOKEN,{
            expiresIn: '1m'
        })

        res.cookie('access_token',accessToken,{
            maxAge: 3600000,
            httpOnly: true
        })

        res.status(200).json({
            message: "berhasil login",
            status: 200,
            token: accessToken
        })

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}   

const logoutHandler = async(req,res) => {
    res.status(202).clearCookie('access_token').json({
        message: "logged out"
    })
}

export default{
    // verifyLogin,
    loginHandler,
    logoutHandler
}