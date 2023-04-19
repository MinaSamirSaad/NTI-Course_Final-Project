class HelperFunctions{
    static resData = (res,statusCode,apiStatus,data,mes)=>{
        res.status(statusCode).send({
            apiStatus:apiStatus,
            data: data,
            message:mes
        })
    }
}
module.exports = HelperFunctions