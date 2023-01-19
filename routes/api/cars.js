const express = require('express')
const router = express.Router()

router.route('/api/cars')
    .get((req,res)=>{
        const inside = [{
            method: req.method,
            url: req.url, 
            }
        ]
        console.log(inside);
        res.json(inside)
    })

module.exports = router