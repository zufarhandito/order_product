import models from "../../models/init-models.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const loginHandler = async(req,res) => {
    try {
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
            expiresIn: '20s'
        })

        res.cookie('access_token',accessToken,{
            maxAge: 3600000,
            httpOnly: true
        })

        res.status(200).json({
            message: "berhasil login",
            status: 200
        })

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}   

export default{
    loginHandler
}