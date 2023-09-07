import { Sequelize } from 'sequelize-typescript'

// Verifique se todas as variáveis de ambiente estão definidas
if (!process.env.DATABASE || !process.env.USER || !process.env.PASSWORD || !process.env.HOST) {
    throw new Error("Certifique-se de definir todas as variáveis de ambiente necessárias.");
}
  
export const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: 'mysql',
    port: 3307,
});