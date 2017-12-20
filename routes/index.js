var express = require('express');
var router = express.Router();
var session = require('express-session');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.send("Welcome to the Pizza delivery application");
});

var pizza = require('../models/pizza').pizza;

router.post('/pizza', function(req, res, next) {
    var addPizza = new pizza();
     addPizza.name = req.body.name;
     addPizza.size = req.body.size;

     if(req.body.size == "Standard")
     {
         addPizza.price = 5.0;
     }else{
         addPizza.price = 10.0;
     }
    console.log(addPizza.price);
    addPizza.save(function(err) {
         if (err)
         { //console.log(err);
            return res.status(400).json();}
            else{
           //  console.log('Request URL:', req.originalUrl+addPizza._id); // Set this in Header
             res.location(req.protocol + '://' + req.get('host')+req.originalUrl+"/"+addPizza._id);
             res.status(201).json();
         }
     });
});

router.get('/pizza',function(req, res) {
    pizza.find(function(err, addPizza) {
        if (err)
        {
            return res.status(404).json();}
        if(addPizza.length > 0)
            res.status(200).json(addPizza);
        else
        res.status(404).json({});
    });
});

router.get('/pizza/:pizza_id',function(req, res) {
    pizza.findById(req.params.pizza_id,function(err, addPizza) {
        if (err)
           return res.status(400).json();
       // res.location(req.originalUrl);
        if (addPizza) {
            res.status(200).json(addPizza);
        } else {
            res.status(404).json({});
        }
    });
});

router.put('/pizza/:pizza_id',function(req, res) {

    pizza.findById(req.params.pizza_id, function(err, pizza) {

        pizza.name = req.body.name;  // update the pizza name
        pizza.size = req.body.size;  // update the pizza size

        if (err)
           return res.status(404).json();

        if(req.body.size == "Standard")
        {
            pizza.price = 5.00;
        }else{
           pizza.price = 10.00;
        }
        // save the pizza

        pizza.save(function(err) {
            if (err)
              return  res.status(400).json();

            res.status(204).json();
        });

    });
});

router.delete('/pizza/:pizza_id',function(req, res) {

   // console.log("delete script");
    //console.log(req.params.pizza_id);
       pizza.findOneAndRemove({
            _id: req.params.pizza_id
        }, function (err, pizza) {
            if (err)
            {
            res.status(404).json();}
           if(pizza){
                       res.status(204).json(); }
                       else{
               res.status(400).json();
           }
            });

});
router.delete('/pizza/',function(req, res) {
    //console.log("delete script");
    if (res)
    {
        res.status(404).json();}

});

module.exports = router;
