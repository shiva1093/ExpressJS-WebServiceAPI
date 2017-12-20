var express = require('express');
var router = express.Router();
var session = require('express-session');
var pizza = require('../models/pizza').pizza;
var topping = require('../models/pizza').topping;
router.post('/pizza/:pizza_id/topping', function(req, res, next) {
  //  console.log(req.params.pizza_id);
    pizza.findById(req.params.pizza_id,function(err, addPizza) {
        if (err)
        {
            return res.json('404',{ message: 'No pizza exist'});}
        if(addPizza)
        {
            var addTopping = new topping();
            addTopping.name = req.body.name;
            addTopping.price = req.body.price;
            addTopping.pizzaId = req.params.pizza_id;
            addTopping.save(function(err) {
                if (err)
                { //console.log(err);
                    return res.status(400).json({ message: 'Invalid Input'});}
                else{
                    //console.log('Request URL:', req.originalUrl+'/'+addTopping._id); // Set this in Header
                  //  console.log( addPizza.price);
                    res.location( req.protocol + '://' + req.get('host')+req.originalUrl+'/'+addTopping._id);
                    res.status(201).json({ message: 'Toppings created!'});
                    addPizza.price = addPizza.price + req.body.price;
                    console.log( addPizza.price);
                    addPizza.save();
                }
            });
       // res.status(200).json(addPizza);

        }
        else{
            res.status(400).json("pizza id not found");
        }
    });
});

router.get('/pizza/:pizza_id/topping',function(req, res) {
    pizza.findById(req.params.pizza_id, function (err, addPizza) {
        if (err) {
            return res.json('404', {message: 'No pizza exist'});
        }
       if (addPizza) {
          //console.log(req.params.pizza_id);
           //console.log("get method");
            topping.find({pizzaId:req.params.pizza_id},function (err, result) {
                if (err) {
                    console.log(err);
                    return res.json('404', {message: 'No pizza exist'});
                }
                if(result.length >0 ) {
                    res.status(200).json(result);
                }else {
                    console.log(result);
                    return res.json('400', {message: 'No toppings found'});
                }
            });
        }else {
            return res.json('404', {message: 'pizza ID not exist'});
        }
    });
});


router.get('/pizza/:pizza_id/topping/:toppingId',function(req, res) {
    pizza.findById(req.params.pizza_id, function (err, addPizza) {
        if (err) {
            return res.json('404', {message: 'No pizza exist'});
        }
        if (addPizza) {
           // console.log(req.params.toppingId);
            topping.findById(req.params.toppingId,function (err, result) {
                if (err) {
                    console.log(err);
                    return res.json('404', {message: 'No pizza exist'});
                }
                if(result) {
                    res.status(200).json({id:result._id,name:result.name,price:result.price});
                }else {
                    console.log(result);
                    return res.json('400', {message: 'Invalid ID supplied'});
                }
            });
        }else {
            return res.json('404', {message: 'pizza or topping not found'});
        }
    });
});

router.delete('/pizza/:pizza_id/topping/:toppingId',function(req, res) {

    pizza.findById(req.params.pizza_id, function (err, addPizza) {
        if (err) {
            return res.json('404', {message: 'No pizza exist'});
        }
        if (addPizza) {
            topping.findOneAndRemove({
                _id: req.params.toppingId
            }, function (err, pizza) {
                if (err) {
                    res.status(404).json({message: 'pizza or topping not found'});
                }
                if (pizza) {
                    res.status(204).json({message: "Topping Deleted"});
                }
                else {
                    res.status(400).json({message: "Invalid Id Supplied"});
                }
            });
        } else {
            return res.json('404', {message: 'pizza or topping not found'});
        }
    });
});
module.exports = router;