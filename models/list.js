'user strict';

module.exports = (sequelize, DataTypes) => {
   return sequelize.define('List', {
        //Define model for List
         list_name: {
            type: DataTypes.STRING, 
            allowNull: false,
            validate: {
                len: [1, 255]
            }
        },

        list_notes: {
            type: DataTypes.TEXT,
            allowNull: true,
            validate: {
                len: [0, 1024]
            },
        },


    });
}; //Export