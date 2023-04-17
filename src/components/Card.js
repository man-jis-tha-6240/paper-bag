import React from 'react'
import styled from "styled-components";
import Rating from '@mui/material/Rating';
import { useStateValue } from '../StateProvider';
function Card(props) {
	let { id,image, title, price, rating } = props;
	const [{ cart }, dispatch] = useStateValue();
	const addToCart = (e) => {
		e.preventDefault();
		dispatch({
			type: "ADD_TO_CART",
			item: {
				id,
				title,
				price,
				image,
				rating,
			},
		});
	};
	return (
		<Container>
			<Image>
				<img src={image} alt="" />
			</Image>
			<Description>
				<h5>{title}</h5>
				<Rating name="half-rating-read" defaultValue={rating} precision={0.5} readOnly />
				<p>₹ {price}</p>
				<button onClick={addToCart}>Add To Cart</button>
			</Description>

		</Container>
	)
}
const Container = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	background-color: #fff;
	z-index: 10;
`;
const Image = styled.div`
	width: 100%;
    display: flex;
	flex-direction: column;
    align-items: center;
	justify-content: center;
	margin-top: 20px;
	flex:0.3;
	img{
		width: 180px;
		height: 200px;
	}
`;
const Description = styled.div`
	width: 90%;
	margin: auto;
    display: flex;
    flex-direction: column;
	justify-content: space-evenly;
	flex: 0.7;
	h{
		font-size: 16px;
		font-weight: 600;
	}
	p{
        font-weight: 600;
	}
	button{
		width: 100%;
		height: 35px;
		background-color: #fa8900;
		border-radius: 10px;
        border: none;
		cursor: pointer;
		&:hover{
			background-color: #FFD814;
		}
	}
`;

export default Card
