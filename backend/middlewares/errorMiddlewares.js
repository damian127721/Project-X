const errorCustom = (err, req, res, next) => {
    if (res.statusCode === 200) {
        res.status(500)
    }

    res.json({
        message: err.message,
        stack: err.stack
    })
}

module.exports = {errorCustom}