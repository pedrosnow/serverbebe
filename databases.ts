import { Sequelize } from "sequelize";


export const sequelize = new Sequelize((process.env.DATABASE ? process.env.DATABASE : ""), (process.env.USER ? process.env.USER : ""), (process.env.PASSWORD ? process.env.PASSWORD : ""), {
    host: (process.env.HOST ? process.env.HOST : ""),
    dialect: 'mysql'
});