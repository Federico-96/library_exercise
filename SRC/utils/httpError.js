class HttpError extends Error{
    constructor(message, statusCode, statusText = null){
        super(message)
        this.statusCode = statusCode;
        this.statusText = statusText;
    }
}

module.exports = HttpError;