import models from "../../models/init-models.js";
import bcrypt from "bcrypt"

const loginHandler = async(req,res) => {
    try {
        const data = await models.users.findOne({
            where: {
                username: req.body.username
            }
        })
        if(!data) throw new Error("User tidak ditemukan")

        const matchPassword = bcrypt.compare(req.body.password,data.password)
        if(!matchPassword) throw new Error("Password salah")

        res.status(200).json({
            message: "berhasil login",
            status: 200,
            data: {                             
                id: data.id,
                username: data.username,
                createdAt: data.createdat,
                updatedAt: data.updatedat
            }
        })
    } catch (error) {
        res.status(400).json({
            message: "Failed to login"
        })
    }
}   

export default{
    loginHandler
}