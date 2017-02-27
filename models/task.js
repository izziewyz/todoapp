'user strict';

module.exports = (sequelize, DataTypes) => {
   return sequelize.define('Task', {
        task_name: {
            type: DataTypes.STRING, 
            allowNull: false,
            validate: {
                len: [1, 255]
            }
        },

        project_name: {
            type: DataTypes.STRING, 
            allowNull: true,
            validate: {
                len: [0, 255]
            }
        },

        context: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [['House', 'Office', 'Mobile', 'Other']] //Enum check
            }
        },

        notes: {
            type: DataTypes.TEXT,
            allowNull: true,
            validate: {
                len: [0, 1024]
            },
        },

        duration_minutes: {
            type: DataTypes.INTEGER,
            validate: {
                isInt: true,
                max: 10080 //Minutes in a week
            }
        },

        priority: {
            type: DataTypes.INTEGER,
            defaultValue: 2,
            allowNull: false,
            validate: {
                isInt: true,
                min: 1,
                max: 3
            }
        },

        completed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
            validate: {
                isIn: [[true, false]]
            }
        }
        
    });
};