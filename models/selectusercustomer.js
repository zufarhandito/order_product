  import _sequelize from 'sequelize';
  const { Model, Sequelize } = _sequelize;

  export default class selectusercustomer extends Model {
    static init(sequelize, DataTypes) {
    return super.init({
      username: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      firstname: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      lastname: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      totalproduct: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      totalprice: {
        type: DataTypes.DECIMAL,
        allowNull: true
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      product_name: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      category: {
        type: DataTypes.STRING(100),
        allowNull: true
      }
    }, {
      sequelize,
      tableName: 'selectusercustomer',
      schema: 'public',
      timestamps: false
    });
    }
  }
