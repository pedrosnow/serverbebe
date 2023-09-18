import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../../config/databases";

type UserAttributes = {
	id: number;
	Nome: string;
	sobreNome: string;
	email: string;
	acesso: string;
	password: string;
	celular: string;
	pass: string;
	isAdmin: boolean;
	createdAt: Date;
	updatedAt: Date;
};

type UserCreationAttributes = Optional<UserAttributes, "id">;

class User extends Model<UserAttributes, UserCreationAttributes> {
	declare id: number;
	declare Nome: string;
	declare sobreNome: string;
	declare email: string;
	declare acesso: string;
	declare password: string;
	declare celular: string;
	declare acessoid: string;
	declare isAdmin: boolean;
	declare createdAt: Date;
	declare updatedAt: Date;
}

User.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
		},
		Nome: {
			type: DataTypes.STRING,
		},
		sobreNome: {
			type: DataTypes.STRING,
		},
		email: {
			type: DataTypes.STRING,
		},
		acesso: {
			type: DataTypes.STRING,
		},
		password: {
			type: DataTypes.TEXT,
		},
		celular: {
			type: DataTypes.STRING,
		},
		pass: {
			type: DataTypes.TEXT
		},
		isAdmin: {
			type: DataTypes.TINYINT
		},
		createdAt: {
			allowNull: false,
			type: DataTypes.DATE,
		},
		updatedAt: {
			allowNull: false,
			type: DataTypes.DATE,
		},
	},
	{ tableName: "Users", sequelize: sequelize }
);

export default User;
