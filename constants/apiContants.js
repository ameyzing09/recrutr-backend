const API_CONSTANTS = {
    HTTP_ERRORS: {
        INTERNAL_SERVER_ERROR: 500,
        NOT_FOUND: 404,
        UNAUTHORIZED: 401,
        INVALID_TOKEN: 412,
        FORBIDDEN: 403,
        BAD_REQUEST: 400,
        SERVICE_UNAVAILABLE: 503
    },

    ERROR_MESSAGES: {
        INVALID_REQUEST: {
            code: 'INVALID_REQUEST',
            message: 'Invalid Request'
        },
        INTERNAL_SERVER_ERROR: {
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Internal server error'
        },
        NOT_FOUND: {
            code: 'NOT_FOUND',
            message: 'Not found'
        }
    }
}

module.exports = API_CONSTANTS