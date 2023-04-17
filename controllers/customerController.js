import models from "../models/init-models.js";

const getCustomers = async(req,res) => {
    try {
        const data = await models.customers.findAll({
            include: [{
                model: models.users,
                as: "user",
                attributes: ['username']
            }]
        })
        if(data.length === 0) throw new Error("Data tidak ditemukan")

        res.status(200).json({
            message: 'success',
            status: 200,
            data: data
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}

const getCustomerById = async(req,res) => {
    try {
        const data = await models.customers.findOne({
            where: {
                id: req.params.id
            },
            include: [{
                model: models.users,
                as: "user",
                attributes: ['username']
            }]
        })
        if(!data) throw new Error("Data tidak ditemukan")

        res.status(200).json({
            message: 'success',
            status: 200,
            data: data
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}

const createCustomer = async(req,res) => {
    try {
        const {firstname,lastname,user_id} = req.body
        const data = await models.customers.create({
            firstname: firstname,
            lastname: lastname,
            user_id: user_id
        })

        res.status(200).json({
            message: 'success',
            status: 200,
            data: data
        })

    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}

const updateCustomer = async(req,res) => {
    try {
        const data = await models.customers.findByPk(req.params.id)
        if(!data) throw new Error("Data tidak ditemukan")

        const {firstname,lastname,user_id} = req.body
        await models.customers.update({
            firstname: firstname,
            lastname: lastname,
            user_id: user_id
        },{
            where: {
                id: req.params.id   
            }
        })

        res.status(200).json({
            message: 'success',
            status: 200,
            data: data
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}

const deleteCustomer = async(req,res) => {
    try {
        const data = await models.customers.findByPk(req.params.id)
        if(!data) throw new Error("Data tidak ditemukan")

        await models.customers.destroy({
            where: {
                id: req.params.id
            }
        })

        res.status(200).json({
            message: 'Data berhasil dihapus',
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}

export default {
    getCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer
}