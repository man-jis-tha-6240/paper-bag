const express = require('express');
require('dotenv').config();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const cors = require('cors');
const mongoose = require('mongoose');
const Products = require('./Products');
const users = require('./Users');
const Orders = require('./Orders');
const stripe = require('stripe')(process.env.STRIPE_KEY);
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
const con_url = process.env.MONGODB_URL;
mongoose.connect(con_url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
app.post('/auth/signup', [
	body('yourName', 'Enter valid name').isLength({ min: 3 }),
	body('phone', 'Enter phone number').isMobilePhone(),
	body('email', 'Enter valid email id').isEmail(),
	body('password', 'Password shoud be alphanumeric and 6 characters long').isAlphanumeric().isLength({ min: 6 })
], async (req, res) => {
	const { yourName, phone, email, password } = req.body;
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	try {
		let user_exists = await users.findOne({ email });
		if (user_exists) {
			return res.status(400).json({ errors: 'User already exists' });
		}
		else {
			const secret = await bcrypt.genSalt(10);
			const encrypt = await bcrypt.hash(password, secret);
			user_exists = await users.create({
				yourName: yourName,
				email: email,
				phone: phone,
				password: encrypt
			});
			res.status(200).send('User created successfully');
		}
	}
	catch (error) {
		console.error(error.message);
		return res.status(400).json({ errors: [{ message: 'Some error occurred' }] })
	}
})
app.post('/auth/login', [
	body('email', 'Enter valid email').isEmail(),
	body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
	const { email, password } = req.body;
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	try {
		let user = await users.findOne({ email });
		if (!user) {
			return res.status(400).json({ errors: 'User not found' });
		}
		else {
			const compPass = await bcrypt.compare(password, user.password);
			if (!compPass) {
				return res.status(400).json({ errors: 'Please try to login with correct credentials' });
			}
			else {
				res.send(user)
			}
		}
	}
	catch (e) {
		return res.status(400).json({ errors: [{ message: 'Some error occurred' }] });
	}
})
app.post('/products/add', (req, res) => {
	const productDetails = req.body;
	console.log(productDetails);
	Products.create(productDetails, (err, data) => {
		if (err) {
			res.status(500).send(err.message);
			console.log(err);
		}
		else {
			res.status(200).send(data);
		}
	})
})
app.get('/products/get', (req, res) => {
	Products.find((err, data) => {
		if (err) {
			res.status(500).send(err.message);
		}
		else {
			res.status(200).send(data);
		}
	})
})
app.post("/payment/create", async (req, res) => {
	const total = req.body.amount;
	console.log(total);
	const payment = await stripe.paymentIntents.create({
		amount: total * 100,
		currency: "inr",
	});
	res.status(201).send({
		clientSecret: payment.client_secret,
	});
});
app.post('/orders/add', (req, res) => {
	const products = req.body.cart;
	const price = req.body.price;
	const email = req.body.email;
	const address = req.body.address;
	const orderDetails = {
		products: products,
		price: price,
		email: email,
		address: address
	}
	Orders.create(orderDetails, (err, data) => {
		if (err) {
			res.status(500).send(err.message);
			console.log(err);
		}
		else {
			res.status(200).send(data);
			console.log(data);
		}
	})
})
app.post('/orders/get', (req, res) => {
	const email = req.body.email;
	Orders.find((err, data) => {
		if (err) {
			res.status(500).send(err.message);
		}
		else {
			const userOrders = data.filter((order) => order.email === email)
			res.status(200).send(userOrders);
		}
	})
})
app.get('/', (req, res) => res.status(200).send('hello world'));
app.listen(port, () => console.log(`Listening to port ${port}`));