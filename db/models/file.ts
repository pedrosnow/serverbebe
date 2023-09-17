import { Optional, DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/databases";
import User from "./user";

type FileAttibutes = {
  id: number,
  file:string,
  acesso:string,
  userid:number,
  createdAt: Date,
  updatedAt: Date,
}


type FileCreationAttributes = Optional<FileAttibutes, 'id'>

class File extends Model<FileAttibutes, FileCreationAttributes> {
  declare id:number;
  declare file:string;
  declare acesso:string;
  declare userid:number;
  declare createdAt: Date;
  declare updatedAt: Date;
}

File.init({
    id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
		},
    file:{
      type: DataTypes.STRING
    },
    acesso: {
      type: DataTypes.STRING
    },
    userid: {
      type: DataTypes.INTEGER
    },
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    },
  }, { sequelize, modelName: 'File'});


export default File;