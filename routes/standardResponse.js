class StandardResponse {
    constructor() {
        this.data = null
        this.error = null
    }

    sendSuccessResponse(res, data, header) {
        this.data = data
        this.error = null
        if(!this.data) return res.sendStatus(200)
        return res.header(header).json(this)
    }

    sendErrorResponse(res, httpStatusCode, error) {
        this.error = error
        this.data = null
        return res.status(httpStatusCode).json(this)
    }
}

export default StandardResponse