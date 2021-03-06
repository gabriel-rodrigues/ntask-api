/**
 * Created by gabrielllbsb on 19/01/17.
 */
import bcrypt from "bcrypt";

module.exports = (sequelize, DataType) => {

    const Users = sequelize.define("Users", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        password: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        email: {
            type: DataType.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    }, {
        classMethods: {
            associate: (models) => {
                Users.hasMany(models.Tasks);
            },
            isPassword: (encodedPassword, password) => {
               return bcrypt.compareSync(password, encodedPassword);
            }
        },
        hooks: {
          beforeCreate: (user) => {
            const salt = bcrypt.genSaltSync();
            user.password = bcrypt.hashSync(user.password, salt);
          }
        }
    });

    return Users;
};
