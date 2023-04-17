import React from 'react'
import styled from 'styled-components'
import { useStateValue } from '../StateProvider';
import { useNavigate } from "react-router-dom";

function Navbar() {
	const [{ cart, user }, dispatch] = useStateValue();
	const navigate = useNavigate();
	const signout = () => {
		dispatch({
			type: 'SET_USER',
			user: null,
		})
		localStorage.removeItem('user');
		navigate('/')
	}
	return (
		<Container>
			<Inner>
				<Logo onClick={() => navigate('/')}>
					<img src="./my_logo.png" alt="" />
					<p>paper-bag</p>
					</Logo>
				<SearchBar>
					<input type="text" placeholder="Search for items" />
					<SearchIcon onClick={() => navigate('/addproduct')}><img src="./addIcon.png" alt="" /></SearchIcon>
				</SearchBar>
				<RightContainer>
					<NavButtons onClick={user?()=>signout():()=>navigate('/login')}>
						<p>Welcome</p>
						<p>{user?user?.yourName:'Sign In'}</p>
					</NavButtons>
					<NavButtons onClick={user?()=>navigate('/orders'):()=>navigate('/login')}>
						<p>Your</p>
						<p>Orders</p>
					</NavButtons>
					<Basket onClick={() => navigate("/checkout")}>
						<img src="./basket-icon.png" alt="" />
						<p>Cart: {cart?.length}</p>
					</Basket>
				</RightContainer>
			</Inner>
			<MobileSearchBar>
				<input type="text" placeholder="Search" />
				<SearchIcon onClick={user?()=>navigate('/addproduct'):()=>navigate('/login')}><img src="./addIcon.png" alt="" /></SearchIcon>
			</MobileSearchBar>
		</Container>
	)
}
const Container = styled.div`
	width: 100%;
	height: 75px;
	background-color: #131921;	
	display: flex;
	align-items: center;
	position: relative;
	overflow-x: hidden;
	@media only screen and (max-width: 768px) {
		height: 83px;
		flex-direction: column;
	}
	@media only screen and (max-width: 540px) {
		height: 120px;
		flex-direction: column;
	}
`;
const Inner = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	@media only screen and (max-width: 767px) {
		justify-content: space-between;
	}
`;
const Logo = styled.div`
	margin-left: 20px;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	img{
		margin-top: 10px;
		width: 100px;
		@media only screen and (max-width: 540px){
			height: 40px;
			width: 60px;
		}
	}
	p{
		margin: 0px 0px 0px 0px;
		color: #fff;
		font-weight: bold;
		font-size: 15px;
		@media only screen and (max-width: 540px){
			font-size: 10px;
		}
	}
`;
const MobileSearchBar = styled.div`
display: flex;
align-items: center;
width: 90%;
height: 35px;
flex: 1;
padding: 10px;
margin: 0px 15px;
overflow: hidden;
input{
	border: none;
	width: 100%;
	height: 100%;
	flex: 1;
	border-radius: 5px 0px 0px 5px;
	&::placeholder{
		padding-left: 10px;
	}
}
@media only screen and (min-width: 767px) {
	display: none;
}
`;
const SearchBar = styled.div`
	display: flex;
    align-items: center;
	height: 35px;
	flex: 1;
	margin: 0px 15px;
	input{
		padding: 5px;
		border: none;
		width: 60%;
		height: 73%;
		flex: 1;
		border-radius: 5px 0px 0px 5px;
		&::placeholder{
			padding-left: 20px;
		}
	}
	@media only screen and (max-width: 767px) {
		display: none;
	}
`;
const SearchIcon = styled.div`
	img{
		width: 18px;
		cursor: pointer;
	}
	border-radius: 0px 5px 5px 0px;
	background-color: #febd69;
	height: 34px;
	width: 30px;
	display: flex;
	align-items: center;
    justify-content: center;
	overflow: hidden;
	@media only screen and (max-width: 767px) {
		height: 48px;
	}
	@media only screen and (max-width: 540px) {
		height: 41px;
	}
`;
const RightContainer = styled.div`
	display: flex;
	align-items: center;
    width: 200px;
    height: 100%;
	justify-content: center;
	padding: 5px 20px;
	@media only screen and (max-width: 767px) {
		width: 70px;
	}
	@media only screen and (max-width: 540px){
		width: 155px;
	}
`;
const NavButtons = styled.div`
	color: #fff;
	padding: 5px;
	height: 80%;
	display: flex;
	flex-direction: column;
	justify-content: center;
    cursor: pointer;

	p{
		margin: 0;
		&:nth-child(1) {
			font-size: 12px;
		}
		&:nth-child(2) {
			font-size: 14px;
			font-weight: 600;
			@media only screen and (max-width: 540px){
				font-size: 9px;
			}
		}
	}
`;
const Basket = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
    height: 90%;
	cursor: pointer;
	img{
		height: 15px;
		width: 14px;
		padding-top: 5px;
        margin-right: 10px;
		@media (max-width: 768px) {
			padding-top: 18px;
		}
	}
	p{
		margin: 0;
		color: #fff;
		font-weight: 500;
		font-size: 12px;
	}
`;
export default Navbar
