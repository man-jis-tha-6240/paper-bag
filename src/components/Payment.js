import React from 'react'
import { useStateValue } from '../StateProvider';
import Navbar from './Navbar';
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { getCartTotal } from '../reducer';
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from '../Axios'

function Payment() {
	const stripe = useStripe();
	const elements = useElements();
	const nav = useNavigate();
	const [clientSecret, setClientSecret] = useState('');
	const [{ address, cart, user }, dispatch] = useStateValue();
	useEffect(() => {
		const fetchClientSecret = async () => {
			const data = await axios.post('https://paper-bag.onrender.com/payment/create', {
				amount: getCartTotal(cart),
			})
			setClientSecret(data.data.clientSecret)
		}
		fetchClientSecret();
	}, [])
	const confirmPayment = async (e) => {
		e.preventDefault();
		await stripe.confirmCardPayment(clientSecret, {
			payment_method: {
				card: elements.getElement(CardElement),
			}
		})
			.then((result) => {
				axios.post('https://paper-bag.onrender.com/orders/add',{
					cart: cart,
					price: getCartTotal(cart),
					email: user?.email,
					address: address,
				})
			}).catch((err) => console.log(err));
			dispatch({
				type: 'EMPTY_CART',
			})
			nav('/orders');
	}
	return (
		<Container>
			<Navbar />
			<Main>
				<RevCont>
					<h2>Review Your Order</h2>
					<AdressContainer>
						<h5>Shipping Address</h5>
						<div>
							<p>{address.fullname}</p>
							<p>{address.pincode}</p>
							<p>{address.flat}</p>
							<p>{address.area}</p>
							<p>{address.landmark}</p>
							<p>{address.city}{address.state}</p>
							<p>{address.phone}</p>
						</div>
					</AdressContainer>
					<PaymentContainer>
						<h5>Payment Details</h5>
						<div>
							<p>
								Card details
								<CardElement/>
							</p>
						</div>
					</PaymentContainer>
					<OrderContainer>
						<h5>Your Orders</h5>
						<div>
							{cart?.map((product) => (
								<Product>
									<Image>
										<img src={product.image} alt="cart" />
									</Image>
									<Description>
										<h4>{product.title}</h4>
										<p>₹ {product.price}</p>
									</Description>
								</Product>
							))}
						</div>
					</OrderContainer>
				</RevCont>
				<SubTotal>
					<CurrencyFormat
						renderText={(value) => (
							<>
								<p>Subtotal ({cart.length} items) : <strong>{value}</strong> </p>
								<small>
									<input type="checkbox" />
									<span>This order contains a gift</span>
								</small>
							</>
						)}
						decimalScale={2}
						value={getCartTotal(cart)}
						displayType="text"
						thousandSeparator={true}
						prefix={"₹ "}
					/>
					<button onClick={confirmPayment}>Place Order</button>
				</SubTotal>
			</Main>
			<footer>
				e-commerce website | copyright 2022 ©
			</footer>
		</Container>
	)
}
const Container = styled.div`
	width: 100%;
	height: fit-content;
	max-width: 1400px;
	margin: auto;
	background-color: rgb(234, 237, 237);
	max-width: 1400px;
	position: relative;
`;
const Main = styled.div`
	display: flex;
    padding: 15px;
	@media only screen and (max-width: 1200px) {
		flex-direction: column;
	}
`;
const RevCont = styled.div`
	padding: 15px;
	background-color: #fff;
	flex: 0.7;
	@media only screen and (max-width: 767px) {
		flex: none;
	}
	h2{
		font-weight: 500;
		padding: 15px;
	}
`;
const AdressContainer = styled.div`
	margin-top: 20px;
	div{
		margin-left: 10px;
		margin-top: 10px;
		p{
			font-size: 12px;
			margin-top: 5px;
		}
	}
`;
const SubTotal = styled.div`
	flex: 0.3;
	background-color: #fff;
	margin-left: 15px;
	height: 200px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	@media only screen and (max-width: 1200px) {
		flex: none;
		margin-top: 15px;
	}
	p{
		font-size: 20px;
	}
	small{
		display: flex;
		align-items: center;
		margin-top: 15px;
		span{
			margin-left: 10px;
		}
	}
	button{
		width: 65%;
		height: 35px;
		background-color: #ffd814;
		border-radius: 10px;
        border: none;
		outline: none;
		cursor: pointer;
		&:hover{
			background-color: #FFD810;
		}
	}
`;
const PaymentContainer = styled.div`
	margin-top: 15px;
	div{
		margin-left: 15px;
		margin-top: 15px;
		p{
			font-size: 14px;
		}
	}
`;
const OrderContainer = styled.div`
	margin-top: 30px;
`;
const Product = styled.div`
	display: flex;
	align-items: center;
`;
const Image = styled.div`
	flex: 0.3;
	img{
		width: 100%;
	}
`;
const Description = styled.div`
	flex: 0.7;
	h4{
		font-weight: 600;
        font-size: 18px;
	}
	p{
		font-weight: 600;
		margin-top: 10px;
	}
	button{
		background-color: transparent;
		border: none;
        outline: none;
		color: #1384b4;
		margin-top: 10px;
		cursor: pointer;
		&:hover{
			text-decoration: underline;
		}
	}
`;
export default Payment
