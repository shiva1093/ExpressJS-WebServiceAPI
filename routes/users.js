var express = require('express');
var router = express.Router();

var pizza = require('../models/pizza');
router.get('/pizza', function(req, res, next) {
   /* var addPizza = new Pizza();
    addPizza.name = req.body.name;
    addPizza.size = req.body.size;
    if(addPizza.size =="Standard")
    {
        addPizza.price = 5;
    }else{
        addPizza.price = 10;
    }

    addPizza.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Pizza created!'});
    });*/
    res.json({ message: 'hooray! welcome to our api!' });
});
module.exports = router;