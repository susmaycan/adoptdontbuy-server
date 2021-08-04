module.exports = {
   sendAPIErrorMessage: ({ res, code = 500, message = "Server error"}) => {
        return res.status(code).send({
            message: message
        })
   }
}
