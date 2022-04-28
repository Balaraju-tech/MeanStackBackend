class AppError extends Error{
    constructor(error){
        super();
        this.statusCode = error.statusCode;
        this.message = error.message;
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;