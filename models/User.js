module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        surname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
        },
        phone_number: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // status: {
        //     type: DataTypes.STRING,
        //     allowNull: false
        // }
    }, {
        tableName: "users",
        timeStamps: true
    })

    return User;
}