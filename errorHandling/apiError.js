class AppError extends Error{
    constructor(error){
        super();
        this.statusCode = error.statusCode;
        this.message = error.message;
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}
const errorHandler= (res, err)=>{
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success:0,
        message: err.message,
        stack: err.stack,
    });
};

module.exports = {AppError, errorHandler};