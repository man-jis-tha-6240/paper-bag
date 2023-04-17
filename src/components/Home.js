import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Card from './Card';
import Navbar from './Navbar';
import axios from '../Axios'
function Home() {
	const [products, setProducts] = useState('');
	useEffect(() => {
		const fetchdata = async () => {
			const data = await axios.get('https://paper-bag.onrender.com/products/get');
			setProducts(data);
		}
		fetchdata();
	}, []);
	return (
		<Container>
			<Navbar />
			<Banner>
				<img src="./banner.jpg" alt="" />
				<img src="./mobile_banner.jpg" alt="" />
			</Banner>
			<Main>
				{products && products?.data.map(products => (
					<Card
						id={products._id}
						image={products.imgUrl}
						title={products.title.slice(0, 45) + '...'}
						rating={products.rating}
						price={products.price} />
				))}
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
	background-color: #131921;
	max-width: 1600px;
`;
const Banner = styled.div`
	width: 100%;
	img{
		width: 100%;
		-webkit-mask-image: linear-gradient(
		  to bottom,
		  rgba(0, 0, 0, 2),
		  rgba(0, 0, 0, 0.95),
		  rgba(0, 0, 0, 0.85),
		  rgba(0, 0, 0, 0.75),
		  rgba(0, 0, 0, 0.55),
		  rgba(0, 0, 0, 0)
		);
		&:nth-child(2){
			display: none;
		}
		@media only screen and (max-width: 767px) {
			&:nth-child(1){
				display: none;
			}
			&:nth-child(2){
				display: block;
				-webkit-mask-image: none;
			}
		}
	}
`;
const Main = styled.div`
  display: grid;
  justify-content: center;
  place-items: center;
  width: 100%;
  grid-auto-rows: 420px;
  grid-template-columns: repeat(4, 280px);
  grid-gap: 20px;
  /* Mobile */
  @media only screen and (max-width: 767px) {
    grid-template-columns: repeat(2, 50%);
    grid-gap: 0;
  }
  /* Tablets */
  @media only screen and (min-width: 767px) and (max-width: 1200px) {
    grid-template-columns: repeat(3, 30%);
  }
  @media only screen and (min-width: 767px) {
    margin-top: -200px;
    padding: 10px 0px;
  }

`;

export default Home
