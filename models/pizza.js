var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection("mongodb://siva:siva@ds149865.mlab.com:49865/pizzadata");
autoIncrement.initialize(connection);
var PizzaSchema   = new Schema({
    id:{ type: Number},
    name: {type: String,required: true},
    size: {type: String,required: true},
    price: { type: Number }
},{ _id: false });

PizzaSchema.plugin(autoIncrement.plugin, 'id');

var ToppingSchema   = new Schema({
    id:{ type: Number},
    name: {type: String,required: true},
    pizzaId: {type: Number,ref: 'pizza'},
    price: { type: Number,required: true }
},{ _id: false });

ToppingSchema.plugin(autoIncrement.plugin, 'id');

var OrderSchema   = new Schema({
    id:{ type: Number},
    orderItems:{
    pizzaId: {type: Number,ref: 'pizza'},quantity:{type: Number}},
    totalPrice: { type: Number,required: true },
    recipient: {type: String,required: true}
},{ _id: false });

OrderSchema.plugin(autoIncrement.plugin, 'id');


var pizza = mongoose.model('Pizza', PizzaSchema);
var topping = mongoose.model('Topping', ToppingSchema);
var order = mongoose.model('Order', OrderSchema);

module.exports ={pizza:pizza,topping:topping,order:order};
//module.exports = mongoose.model('Topping', ToppingSchema);