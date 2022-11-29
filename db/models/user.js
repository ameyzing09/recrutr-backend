const { DataTypes, Model } = require('sequelize')

class User extends Model {
    static get modelFields() {
        return {
            id: {
                type: DataTypes.INTEGER(11),
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },

            name: {
                type: DataTypes.STRING(255),
                allowNull: false
            },

            username: {
                type: DataTypes.STRING(55),
                allowNull: false
            },

            password: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },

            is_sso_user: {
                type: DataTypes.BOOLEAN,
                allowNull: true
            },

            role: {
                type: DataTypes.ENUM( 'ADMIN', 'HR', 'INTERVIEWER'),
                allowNull: false
            },

            status: {
                type: DataTypes.ENUM('ACTIVE', 'INACTIVE', 'DELETED'),
                allowNull: false
            }
        }
    }

    static get modelOptions() {
        return {
            timestamps: false
        }
    }

    static init(sequelize) {
        const options = { ...this.modelOptions, sequelize, tableName: 'user' }
        return super.init(this.modelFields, options);
    }

    static associate(models) {

    }
}

module.exports = User