const express = require('express')
const cors = require('cors')

const logger = require('./logger')('userApp.js')
const UserRoutes = require('../routes/userRoutes')

class App {
    async initialiseBackendServer() {
        logger.info('Initialising backend server ')
        this.app = express()
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(express.json())

        this.app.use(cors())
        logger.info('Initialising backend server ')
        this.userRoutes = new UserRoutes(this.app)
        this.userRoutes.init()
    }
}

module.exports = new App()