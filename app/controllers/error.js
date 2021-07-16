module.exports = {

    resourceNotFound: (_, res) => {

        res.status(404).send({
            data: [],
            message: 'Resource not found'
        });

    }

}