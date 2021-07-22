module.exports = {

    resourceNotFound: (_, res) => {
        res.status(404).send({
            message: 'Resource not found'
        })
    }

}