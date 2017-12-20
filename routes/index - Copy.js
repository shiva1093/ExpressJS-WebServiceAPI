var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.json({ message: 'hooray! welcome to our api!' });
});

var pizza = require('../models/pizza');

router.post('/pizza', function(req, res, next) {
    var addPizza = new pizza();
     addPizza.name = req.body.name;
     addPizza.size = req.body.size;

     if(req.body.size == "Standard")
     {
         addPizza.price = 5.0000;
     }else{
         addPizza.price = 10.000;
     }
   //console.log('Request URL:', req.originalUrl+addPizza.id); // Set this in Header
    addPizza.save(function(err) {
         if (err)
         { //console.log(err);
            return res.status(400).json({ message: 'Invalid Input'});}
            else{
       //    res.json({ message: 'Pizza created!'});
             res.location( req.originalUrl+addPizza.id);
             res.statusMessage = "Pizza Created";
             res.status(201).end();
         }
     });
   // res.json({ message: 'hooray! welcome to our api!' });
});

router.get('/pizza',function(req, res) {
    pizza.find(function(err, addPizza) {
        if (err)
            return res.json('404',{ message: 'No pizza exist'});

        res.json('200',addPizza);
    });
});

router.get('/pizza/:pizza_id',function(req, res) {
    pizza.findById(req.params.pizza_id,function(err, addPizza) {
        if (err)
           return res.json('404',{ message: 'Pizza could not be found'});
       // res.location(req.originalUrl);
        res.json('200',addPizza);
    });
});

router.put('/pizza/:pizza_id',function(req, res) {
    // use our bear model to find the bear we want
    pizza.findById(req.params.pizza_id, function(err, pizza) {

        pizza.name = req.body.name;  // update the pizza name
        pizza.size = req.body.size;  // update the pizza size

        if (err)
           return res.json('404',{ message:'Pizza not found'});

        if(req.body.size == "Standard")
        {
            pizza.price = 5.0000;
        }else{
           pizza.price = 10.000;
        }
        // save the bear
        pizza.save(function(err) {
            if (err)
              return  res.json('400',{ message: 'Invalid Pizza Supplied' });

            res.json('201',{ message: 'Pizza updated!' });
        });

    });
});

router.delete('/pizza/:pizza_id',function(req, res) {
    // use our bear model to find the bear we want
    console.log("delete script");
    console.log(req.params.pizza_id);
        pizza.remove({
            _id: req.params.pizza_id
        }, function (err, pizza) {
            if (err)
               // res.send(err);
               //return res.status(400).json({ message: 'Invalid Id Supplied' });
            {
            res.statusMessage = "Invalid Id Supplied";
            res.status(400).end();}
    else{
                res.statusMessage = "Pizza deleted";
                res.status(204).end(); }
            });

});


module.exports = router;
