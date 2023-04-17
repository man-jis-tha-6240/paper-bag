import React from 'react'
import { useEffect,useState } from 'react';
import styled from 'styled-components'
import Navbar from './Navbar';
import axios from '../Axios';
import { useStateValue } from '../StateProvider';

function Orders() {
	const [{ user }] = useStateValue();
	const [orders, setOrders] = useState([]);
	useEffect(() => {
	  axios
		.post("https://paper-bag.onrender.com/orders/get", { email: user.email })
		.then((res) => setOrders(res.data));
	}, []);
	console.log(orders);
  return (
	<Container>
	<Navbar />
	<Main>
	  <OrderContainer>
		<h2>Your Orders</h2>

		{orders.map((order) => (
		  <OrderDetails>
			<AddresssContainer>
			  <h4>Shipping Address</h4>

			  <div>
				<p>{order.address.fullName}</p>
				<p>{order.address.flat}</p>
				<p>{order.address.area}</p>

				<p>
				  {order.address.city} {order.address.state}
				</p>
				<p>Phone : {order.address.phone}</p>
			  </div>
			</AddresssContainer>
			<OrdersBasket>
			  <h4>Order</h4>
			  <p>
				Subtotal : ₹ <span>{order.price}</span>
			  </p>

			  {order.products.map((product) => (
				<Product>
				  <Image>
					<img src={product.image} alt="" />
				  </Image>
				  <Description>
					<h4>{product.title}</h4>

					<p>₹ {product.price}</p>
				  </Description>
				</Product>
			  ))}
			</OrdersBasket>
		  </OrderDetails>
		))}
	  </OrderContainer>
	</Main>
	<footer>
				e-commerce website | copyright 2022 ©
			</footer>
  </Container>
);
}

const Container= styled.div`
	width: 100%;
	height: fit-content;
	max-height: 1400px;
	margin: auto;
	background-color: rgb(234, 237, 237);
`;
const Main= styled.div`
	min-width: 100vw;
	min-height: 100vh;
	display: flex;
	justify-content: center;
`;
const OrderDetails= styled.div`
	border-bottom: 1px solid lightgray;
	padding-bottom: 15px;
`;
const OrdersBasket= styled.div`
	margin-top: 20px;
	p{
		margin-top: 15px;
		font-size: 15px;
		margin-left: 15px;
		span{
			font-weight: 600;
		}
	}
`;
const AddresssContainer= styled.div`
	margin-top: 20px;
	div{
		margin-top: 10px;
		margin-left: 10px;
		p{
			font-size: 15px;
			margin-top: 4px;
		}
	}
`;
const OrderContainer= styled.div`
	padding: 15px;
	background-color: #fff;
	width: 95%;
	h2{
        font-weight: 700;
		padding-bottom: 15px;
		border-bottom: 1px solid lightgray
	}
`;
const Product = styled.div`
	display: flex;
	align-items: center;
`;
const Image = styled.div`
	flex: 0.15;
	img{
		width: 100%;
	}
`;
const Description = styled.div`
	flex: 0.7;
	h4{
		font-weight: 600;
        font-size: 18px;
		@media only screen and (max-width: 1200px){
			font-size: 14px;
		}
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
export default Orders
