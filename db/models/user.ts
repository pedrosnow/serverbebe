import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../config/databases";

class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      Nome: {
        type: DataTypes.STRING
      },
      sobreNome: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING
      },
      acesso: {
        type: DataTypes.STRING
      },
      password: {
        type: DataTypes.STRING
      },
      celular: {
        type: DataTypes.STRING
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
},{ tableName: "Users", sequelize: sequelize })

export default User