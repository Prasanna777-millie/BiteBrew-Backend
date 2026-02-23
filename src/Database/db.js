import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  "BiteBrew",    
  "postgres",     
  "3720",    
  {
    host: "localhost",
    port: 5433,
    dialect: "postgres",
  }
);

export const connection = async () => {
  try {
    await sequelize.authenticate(); 
    await sequelize.sync({alter:true});         
    console.log("Database connected successfully");
  } catch (e) {
    console.error("Database connection failed:", e.message);
  }
};