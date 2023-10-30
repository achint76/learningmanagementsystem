const sequelize = require('../db/config');

const Users = require('./users');
const Session = require('./Sessions');
const Subject = require('./subject');
const Teacher = require('./teacher');
sequelize.sync({alter:true});

Subject.hasMany(Teacher, {
    foreignKey: 'subject_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})
Teacher.belongsTo(Subject, {
    foreignKey: 'subject_id'
});

Users.hasMany(Teacher, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})
Teacher.belongsTo(Users, {
    foreignKey: 'user_id'
});

module.exports = {
    Users,
    Session,
    Subject,
    Teacher
}