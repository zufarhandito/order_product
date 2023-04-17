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

        const data = await models.product_categories.create({
            name: req.body.name,
            description: req.body.description
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

export default {
    getCategories,
    getCategoryById,
    createCategory
}