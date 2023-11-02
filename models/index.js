const sequelize = require('../db/config');

const Users = require('./users');
const Session = require('./Sessions');
const Subject = require('./subject');
const Teacher = require('./teacher');
const Subscription = require('./subscription');
const TrainingSession = require('./trainingsession');
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
Users.hasMany(Subscription, {
   foreignKey: 'student_id',
   onDelete: 'CASCADE',
   onUpdate: 'CASCADE' 
})
Subscription.belongsTo(Users, {
    foreignKey: 'student_id'
})
Teacher.hasMany(Subscription, {
    foreignKey: 'teacher_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})
Subscription.belongsTo(Teacher, {
    foreignKey: 'teacher_id'
})

module.exports = {
    Users,
    Session,
    Subject,
    Teacher,
    Subscription,
    TrainingSession
}