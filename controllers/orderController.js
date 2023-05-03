import models, {sequelize} from "../models/init-models.js"

const getOrders = async(req,res) => {
    try {
        const data = await models.orders.findAll()
        if(data.length === 0) throw new Error ('Data tidak ditemukan');

        res.status(200).json({
            message: 'success',
            status: 200,
            data: data
        })
    } catch (error) {
        res.status(404).json({
            message: error.message,
            status: 404,
        })
    }
}

const getOrderById = async(req,res) => {
    try {

        const data = await models.orders.findByPk(datanya)
        if(!data) throw new Error ("Data order yang anda cari tidak ditemukan")

        res.status(200).json({
            message: 'success',
            status: 200,
            data: data
        })
    } catch (error) {
        res.status(404).json({
            message: error.message,
            status: 404,
        })
    }
}
const createOrder = async(req,res) => {
    try {
        let user_id = 0
        let totalprice = 0
        let totalproduct = 0
        for(let i in req.body) {
            user_id= req.body[i].user_id;
            totalproduct += req.body[i].quantity;
            totalprice += (req.body[i].price * req.body[i].quantity)
        }
        let data = {
            user_id: user_id,
            totalproduct: totalproduct,
            totalprice: totalprice
        }

        console.log(totalproduct);
        const data1 = `[${JSON.stringify(data)}]`
        const data2 = `${JSON.stringify(req.body)}`

        await sequelize.query(`CALL InsertOrderxDetail('${data1}','${data2}')`);

        res.send('berhasil')

    } catch (error) {   
        res.send(error.message)
    }
}

const updateOrder = async(req,res) => {
    try {
        const findId = await models.orders.findByPk(req.params.id);
        if(!findId) throw new Error ("Data yang anda cari tidak ada");

        const { user_id, totalproduct, totalprice } = req.body

        await models.orders.update({
            user_id: user_id,
            totalproduct: totalproduct,
            totalprice: totalprice
        },{
            where: {
                id: req.params.id
            }
        });
    
        res.status(200).json({
            message: 'success',
            data: findId
        })

    } catch (error) {
        res.status(400).json({
            message: error.message,
            status: 400,
        })
    }
}

const deleteOrder = async(req,res) => {
    try {
        let findId = await models.orders.findByPk(req.params.id);
        if(!findId) throw new Error("Data tidak ditemukan")

        await models.orders.destroy({
            where: {
                id: req.params.id
            }
        })

        res.status(200).json({
            message: "data berhasil di hapus"
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
} 

export default {
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
}