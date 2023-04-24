import StandardResponse from './standardResponse.js'

import { HTTP_ERRORS, ERROR_MESSAGES } from '../constants/apiContants.js'

import userRoute from './userRouter.js'
import useLogger from '../lib/logger.js';

const logger = useLogger('userRoutes.js')

const response = new StandardResponse()

class UserRoutes {
    constructor(app) {
        this.app = app
    }

    init() {
        logger.debug('In userRoutes init() ')
        this.app.use('/api', userRoute)

        this.app.use((req, res) => {
            response.sendErrorResponse(
                res,
                HTTP_ERRORS.NOT_FOUND,
                ERROR_MESSAGES.NOT_FOUND
            )
        })
    }
}

export default UserRoutes