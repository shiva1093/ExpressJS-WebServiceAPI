var express = require('express');
var router = express.Router();
var session = require('express-session');
var pizza = require('../models/pizza').pizza;
var order = require('../models/pizza').order;

router.post('/order', function(req, res, next) {
    var addOrder = new order();
    addOrder.recipient = req.body.recipient;
    addOrder.orderItems.pizzaId = req.body.orderItems[0].pizzaId;
    addOrder.orderItems.quantity = req.body.orderItems[0].quantity;
    pizza.findById(req.body.orderItems[0].pizzaId,function(err, pizzaDetails) {
        if (err)
            return res.json('404',{ message: 'Invalid order'});
        // res.location(req.originalUrl);
        if (pizzaDetails) {
            addOrder.totalPrice = pizzaDetails.price * addOrder.orderItems.quantity;
            addOrder.save(function(err) {
                res.location( req.protocol + '://' + req.get('host')+req.originalUrl+"/"+addOrder._id);
                res.status(201).send();
            });
        } else {
            res.status(404).send({ message: 'Invalid order'});
        }
    });



});

router.get('/order',function(req, res) {
    order.find(function(err, orderDetails) {
        if (err)
        {
            return res.json('404',{ message: 'No orders found'});}
        if(orderDetails.length > 0)
        res.status(200).json(orderDetails);
        else
            return res.json('404',{ message: 'No orders found'});
    });
});

router.get('/order/:order_id',function(req, res) {
    order.findById(req.params.order_id,function(err, orderDetails) {
        if (err)
            return res.json('404',{ message: 'Order Could not be found'});
        // res.location(req.originalUrl);
        if (orderDetails) {
            res.status(200).send(orderDetails);
        } else {
            res.status(400).send({ message: 'Invalid ID supplied'});
        }
    });
});

router.delete('/order/:order_id',function(req, res) {
    order.findOneAndRemove({
        _id: req.params.order_id
    }, function (err, orderDetails) {
        if (err)
        {
            res.status(404).json({message:'Order Not found'});}
        if(orderDetails){
            res.status(204).json({message:"Order Deleted"}); }
        else{
            res.status(400).json({message:"Invalid Order Id Supplied"});
        }
    });

});
router.delete('/order/',function(req, res) {
    if (res)
    {
        res.status(404).json({message:'Order Not found'});}

});
module.exports = router;