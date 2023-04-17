import React from 'react'
import { useStateValue } from '../StateProvider';
import Navbar from './Navbar';
import { getCartTotal } from '../reducer';
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
function CheckOut() {
	const nav = useNavigate();
	const [{ cart,user }, dispatch] = useStateValue();
	const removeItem = (e, id) => {
		e.preventDefault();
		dispatch({
			type: 'REMOVE_FROM_CART',

			id: id,

		})
	}
	return (
		<Container>
			<Navbar />
			<Main>
				<ShoppingCart>
					<h2>Shopping Cart</h2>
					{cart?.map((product) => (
						<Product>
							<Image>
								<img src={product.image} alt="cart" />
							</Image>
							<Description>
								<h4>{product.title}</h4>
								<p>₹ {product.price}</p>
								<button onClick={(e) =>  removeItem(e, product.id) }>Delete</button>
							</Description>
						</Product>
					))}
				</ShoppingCart>
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
					<button onClick={user?() => nav('/address'):() => nav('/login')}>Proceed To Checkout</button>
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
const ShoppingCart = styled.div`
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
	}
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
export default CheckOut
