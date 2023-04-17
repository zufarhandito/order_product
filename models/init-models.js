import { Sequelize } from "sequelize"
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: "postgresql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _customers from  "./customers.js";
import _order_details from  "./order_details.js";
import _orders from  "./orders.js";
import _product_categories from  "./product_categories.js";
import _products from  "./products.js";
import _users from  "./users.js";

function initModels(sequelize) {
  const customers = _customers.init(sequelize, DataTypes);
  const order_details = _order_details.init(sequelize, DataTypes);
  const orders = _orders.init(sequelize, DataTypes);
  const product_categories = _product_categories.init(sequelize, DataTypes);
  const products = _products.init(sequelize, DataTypes);
  const users = _users.init(sequelize, DataTypes);

  order_details.belongsTo(orders, { as: "order", foreignKey: "order_id"});
  orders.hasMany(order_details, { as: "order_details", foreignKey: "order_id"});
  products.belongsTo(product_categories, { as: "category", foreignKey: "category_id"});
  product_categories.hasMany(products, { as: "products", foreignKey: "category_id"});
  order_details.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(order_details, { as: "order_details", foreignKey: "product_id"});
  customers.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(customers, { as: "customers", foreignKey: "user_id"});
  orders.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(orders, { as: "orders", foreignKey: "user_id"});

  return {
    customers,
    order_details,
    orders,
    product_categories,
    products,
    users,
  };
}

const models = initModels(sequelize);
export default  models
export {sequelize}