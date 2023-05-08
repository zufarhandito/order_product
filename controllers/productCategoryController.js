import models from "../models/init-models.js";

const getCategories = async(req,res) => {
    try {
        const data = await models.product_categories.findAll();
        if(data.length === 0) throw new Error("Data tidak ditemukan")

        res.status(200).json({
            message: "Success",
            status: 200,
            data: data
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}


const getCategoryById = async(req,res) => {
    try {
        const data = await models.product_categories.findByPk(req.params.id);
        if(!data) throw new Error("Data tidak ditemukan")

        res.status(200).json({
            message: "Success",
            status: 200,
            data: data
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}

const createCategory = async(req,res) => {
    try {
        const {description,name} = req.body
        const data = await models.product_categories.create({
            name,
            description
        })

        res.status(201).json({
            message: 'success',
            status: 201,
            data: data
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const updateCategory = async(req,res) => {
    try {
        const findId = await models.product_categories.findByPk(req.params.id)
        if(!findId) throw new Error('kategori tidak ditemukan')

        const {name, description} = req.body
        await models.product_categories.update({
            name,
            description
        },{
            where: {
                id: req.params.id
            }
        })

        res.send('sukses')
    } catch (error) {
        res.send(error.message)
    }
}

export default {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory
}