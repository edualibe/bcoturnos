const express = require('express');
const router = express.Router();

router.get('/turnos', (req,res)=>{
    res.render('index.hbs');
});

module.exports = router;