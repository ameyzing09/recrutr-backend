const StandardResponse = require('./StandardResponse')

const { HTTP_ERRORS, ERROR_MESSAGES } = require('../constants/apiContants')

const userRoute = require('./userRouter')

const response = new StandardResponse()

class UserRoutes {
    constructor(app) {
        this.app = app
    }

    init() {
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

module.exports = UserRoutes