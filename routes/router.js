import { Router } from "express";
import userController from "../controllers/userController.js"
import orderController from "../controllers/orderController.js";
import authController from "../controllers/auth/authController.js";
import productController from "../controllers/productController.js";
import productCategoryController from "../controllers/productCategoryController.js";
import orderDetailsController from "../controllers/orderDetailsController.js";
import customerController from "../controllers/customerController.js";

const router = Router()

/*
route untuk users. 
*/
router.get('/user', userController.getUsers)

router.get('/user/:id', userController.getUserById)

router.post('/user', userController.createUsers)

router.delete('/user/:id',userController.deleteUser)

router.patch('/user/:id', userController.updateUsers)

/*
route untuk products
*/

router.get('/products',productController.getProducts)
router.get('/products/:id',productController.getProductById)
router.post('/products',productController.upload,productController.createProduct)
router.patch('/products/:id',productController.updateProduct)
router.delete('/products/:id',productController.deleteProduct)

/*
route untuk product category
*/

router.get('/categories',productCategoryController.getCategories)

router.get('/categories/:id',productCategoryController.getCategoryById)

router.post('/categories',productCategoryController.createCategory)

/*
route untuk 
*/

router.get('/orderdetails',orderDetailsController.getOrderDetails)
router.get('/orderdetails/:id',orderDetailsController.getOrderDetailById)
router.post('/orderdetails',orderDetailsController.createOrderDetails)
router.patch('/orderdetails/:id',orderDetailsController.updateOrderDetais)
router.delete('/orderdetails/:id',orderDetailsController.deleteOrderDetails)

/*
route untuk customer
*/

router.get('/customers',customerController.getCustomers)
router.get('/customers/:id',customerController.getCustomerById)
router.post('/customers',customerController.createCustomer)
router.patch('/customers/:id',customerController.updateCustomer)
router.delete('/customers/:id',customerController.deleteCustomer)

/*
route untuk order 
*/

router.get('/orders', orderController.getOrders)

router.get('/orders/:id', orderController.getOrderById)

router.post('/orders', orderController.createOrder)

router.patch('/orders/:id',orderController.updateOrder)

router.delete('/orders/:id',orderController.deleteOrder)


router.post('/login',authController.loginHandler)

export default router
