// status code 200
const complete = (res, data, message="action success !") => {
    res.status(200).json({
        status: 200,
        message,
        data
    })
}

// status code 400
const errFE = (res, data, message="some input is wrong!") => {
    res.status(400).json({
        status: 400,
        message,
        data
    })
}

// status code 500
const errBE = (res, data, message="there be some error on server!") => {
    res.status(500).json({
        status: 500,
        message,
        data
    })
}

module.exports = {
    complete,
    errFE,
    errBE
}