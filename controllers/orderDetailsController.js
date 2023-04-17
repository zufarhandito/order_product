import models from "../models/init-models.js";

const getOrderDetails = async(req,res) => {
    try {
        const data = await models.order_details.findAll({
            attributes: ['id','quantity'],
            include: [
                {
                    model: models.products,
                    as: "product",
                    attributes: ['id','name','description','price','image'],
                    include: [{
                        model: models.product_categories,
                        as : "category",
                        attributes: ['id','name','description']
                    }]
                },
                {
                    model: models.orders,
                    as: "order",
                    attributes: ['id','totalproduct','totalprice']
                }
            ]
        })
        if(data.length === 0) throw new Error('Data tidak ditemukan')

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

const getOrderDetailById = async(req,res) => {
    try {
        const data = await models.order_details.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['id','quantity'],
            include: [
                {
                    model: models.products,
                    as: "product",
                    attributes: ['id','name','description','price','image'],
                    include: [{
                        model: models.product_categories,
                        as : "category",
                        attributes: ['id','name','description']
                    }]
                },
                {
                    model: models.orders,
                    as: "order",
                    attributes: ['id','totalproduct','totalprice']
                }
            ]
        })

        if(!data) throw new Error("Data tidak ditemukan")

        res.status(200).json({
            message: "success",
            status: 200,
            data: data
        })

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const createOrderDetails = async(req,res) => {
    try {
        const {order_id,product_id,quantity} = req.body

        const data = await models.order_details.create({
            order_id: order_id,
            product_id: product_id,
            quantity: quantity
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

const updateOrderDetais = async(req,res) => {
    try {
        const data = await models.order_details.findByPk(req.params.id);
        if(!data) throw new Error("Data tidak ditemukan")

        const { order_id, product_id, quantity } = req.body
        console.log(quantity);

        await models.order_details.update({
            order_id: order_id,
            product_id: product_id,
            quantity: quantity
        },{
            where: {
                id: req.params.id
            }
        });

        res.status(200).json({
            message: 'success',
            status: 200,
            data: data
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const deleteOrderDetails = async(req,res) => {
    try {
        const data = await models.order_details.findByPk(req.params.id);
        if(!data) throw new Error("Data tidak ditemukan")

        models.order_details.destroy({
            where: {
                id: req.params.id
            }
        })

        res.status(200).json({
            message: "Data telah dihapus"
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

export default {
    getOrderDetails,
    createOrderDetails,
    updateOrderDetais,
    deleteOrderDetails,
    getOrderDetailById
}