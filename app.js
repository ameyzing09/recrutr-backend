const express = require('express')
const sequelize = require('./db/models/dbConfig')

const app = express()

require('dotenv').config()

const logger = require('./lib/logger')('app.js')

const PORT = process.env.PORT

async function startBackendServer() {
    try {
        await sequelize.init()
        logger.info("Database connection successful")
    } catch (error) {
        logger.error("Error starting backend server : ", error)
        throw error
    }
}

startBackendServer()

app.listen(PORT, () => logger.info(`Backend server started at port ${PORT}`))