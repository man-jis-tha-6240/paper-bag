const mongoose = require('mongoose');
const ProductSchema = mongoose.Schema({
	title: String,
	imgUrl: String,
	price: Number,
	rating: Number,
})
module.exports = mongoose.model('Products', ProductSchema);