const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    host: 'localhost',
    port: 3306,
    database: 'learningmanagement',
    dialect: 'mysql',
    username: 'root',
    password: '',
    logging: false
});

sequelize.authenticate().then(() => {
    console.log("Database connected");
}).catch(err => {
    console.log("Error database: -> ", err);
});

module.exports = sequelize;