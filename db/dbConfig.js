require("dotenv").config()
const fs = require('fs')
const Sequelize = require('sequelize')
const logger = require('../lib/logger')('sequelize.js')

class sequelize {
    async init() {
        try {
            const dbConfig = this.getDBConfig();
            const monitorDBConfig = JSON.parse(dbConfig.DB_CONFIG)
            console.log("Dbconfig : ", dbConfig)
            console.log("monitorDBConfig : ", monitorDBConfig)
            this.sequelize = new Sequelize(
                dbConfig.DB_NAME,
                dbConfig.DB_USER,
                dbConfig.DB_PASSWORD,
                {
                    host: dbConfig.DB_HOST,
                    dialect: 'mysql',
                    pool: {
                        max: monitorDBConfig.poolMax,
                        min: monitorDBConfig.poolMin,
                    },
                    define: {
                        freezeTableName: true,
                    },
                    logging: true,
                },
            )

            fs.readdirSync(`${__dirname}/models/`)
            .filter(file => (file.indexOf('.') !== 0) && (file !== 'index.js') && (file.indexOf('.js') > 0))
            .forEach(file => {
                const model = require(`${__dirname}/models/${file}`)
                model.init(this.sequelize)
            })

            const dbModels = this.sequelize.models
            Object.keys(dbModels).forEach(modelName => {
                if(dbModels[modelName].associate) {
                    dbModels[modelName].associate(dbModels)
                }
            })
        } catch(error) {
            logger.error("Error connecting to database ", error)
            throw error
        }
    }

    getDBConfig() {
        // console.log('getDBConfig : ',process.env.DB_HOST, process.env.DB_USER, process.env.DB_PASSWORD, process.env.DB_CONFIG)
        if(process.env.DB_HOST && process.env.DB_USER && process.env.DB_PASSWORD && process.env.DB_CONFIG) {
            return {
                DB_HOST: process.env.DB_HOST,
                DB_USER: process.env.DB_USER,
                DB_PASSWORD: process.env.DB_PASSWORD,
                DB_CONFIG: process.env.DB_CONFIG,
                DB_NAME: process.env.DB_NAME
            }
        }
        return;
        // TODO: code for DB creds taken from AWS, Azure, Google Cloud
    }
}

module.exports = new sequelize()