import Sequelize from "sequelize";
import File from "./file.model.js";


const sequelize = new Sequelize('sqlite::memory:');
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.file = File(sequelize, Sequelize);

export default db