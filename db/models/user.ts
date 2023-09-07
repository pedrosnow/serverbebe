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
},{ tableName: "Users", sequelize: sequelize })

export default User