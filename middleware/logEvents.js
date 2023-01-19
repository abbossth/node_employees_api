const { v4:uuid } = require('uuid')

let userOrder = 0
const logEvents = (req,res,next) => {
    userOrder+=1
    console.log(`${userOrder}  Time:`, new Date(), '\tRequestID: ', uuid(),`\t${req.method}`, `\t${req.url}`);
    next()
}

module.exports = logEvents