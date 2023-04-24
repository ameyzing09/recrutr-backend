import express, { urlencoded, json } from 'express'
import cors from 'cors'

import useLogger from './logger.js';
import UserRoutes from '../routes/userRoutes.js'

const logger = useLogger('userApp.js')
class App {
    async initialiseBackendServer() {
        logger.info('Initialising backend server ')
        this.app = express()
        this.app.use(urlencoded({ extended: true }))
        this.app.use(json())

        this.app.use(cors())
        this.userRoutes = new UserRoutes(this.app)
        this.userRoutes.init()
    }
}

export default new App()