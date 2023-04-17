import React from 'react'
import { useState } from 'react';
import styled from "styled-components";
import axios from '../Axios'
import Navbar from './Navbar';
import { useStateValue } from '../StateProvider';
import { useNavigate } from "react-router-dom";

function AddProduct() {
	const nav=useNavigate();
	const [title, setTitle] = useState('');
	const [imgUrl, setImgUrl] = useState('');
	const [price, setPrice] = useState(0);
	const [rating, setRating] = useState(0);
	const [{  user }] = useStateValue();
	const checkAdmin=()=>{	
		if (user.email==='thisisadmin@gmail.com') {
			addProduct();
			nav('/');
		}
		else{
			alert('Only admin can add products')
			nav('/');
		}
	}
	const addProduct = () => {

		axios.post('/products/add', { title, imgUrl, price, rating, }).then(() => {
			setTitle('');
			setImgUrl('');
			setPrice(0);
			setRating(0);
		}).catch((err) => alert(err.message));
	}
	return (
		<>
			<Navbar/>
		<Container>
			<Logo>
				<img src="amazon_logo.png" alt="" />
			</Logo>
			<FormContainer>
				<h3>Add Product</h3>
				<InputContainer>
					<label >Title</label>
					<input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
				</InputContainer>
				<InputContainer>
					<label >Image Url</label>
					<input type="text" value={imgUrl} onChange={(e) => setImgUrl(e.target.value)} />
				</InputContainer>
				<InputContainer>
					<label >Price</label>
					<input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
				</InputContainer>
				<InputContainer>
					<label >Rating</label>
					<input type="text" value={rating} onChange={(e) => setRating(e.target.value)} />
				</InputContainer>
				<Button onClick={checkAdmin}>Add</Button>
			</FormContainer>
		</Container>
			<footer>
				e-commerce website | copyright 2022 ©
			</footer>
		</>
	)
}

const Container = styled.div`
	width: 75%;
	height: fit-content;
	padding: 15px;
	margin: auto;
	display: flex;
	flex-direction: column;
	align-items: center;
`;
const FormContainer = styled.form`
	border: 1px solid lightgray;
	width: 75%;
	height: fit-content;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 15px;
	h3 {
		font-size: 28px;
		font-weight: 400;
		line-height: 33px;
		align-self: flex-start;
		margin-bottom: 10px;
		overflow: hidden;
	}
`;
const InputContainer = styled.div`
	width: 100%;
	padding: 10px;
	p{
		font-size: 14px;
        font-weight: 600;
	}
	input{
		width: 95%;
        height: 33px;
		padding-left: 5px;
		border-radius: 5px;
		margin-top: 5px;
		border: 1px solid rgb(234, 237, 237);
		&:hover{
			border: 1px solid orange;
		}
	}
`;
const Button = styled.button`
	width: 70%;
    height: 33px;
	background-color: #f3b414;
	border: none;
	outline: none;
	border-radius: 10px;
	margin-top: 20px;
	cursor: pointer;
    &:hover{
		background-color: #FFD814;
	}
`;
const Logo = styled.div`
	width: 120px;
	margin-bottom: 20px;
	img{
		width: 100%;
	}
`;
export default AddProduct
