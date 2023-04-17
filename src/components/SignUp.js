import React from 'react'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from '../Axios';
function SignUp() {
	const nav = useNavigate();
	const [yourName, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [phone, setPhone] = useState('');
	const signup = (e) => {
		e.preventDefault();
		axios
			.post("https://paper-bag.onrender.com/auth/signup", { yourName, phone, email, password })
			.then((res) => alert('User created successfully'))
			.catch((err) => console.warn(err));
		nav('/login')
	}
	return (
		<Container>
			<Logo>
				<img src="my_logo.png" alt="" />
				<p>paper-bag</p>
			</Logo>
			<FormContainer>
				<h3>Create Account</h3>
				<InputContainer>
					<label >Your name</label>
					<input type="text" placeholder='First and last name' value={yourName} onChange={(e) => setName(e.target.value)} />
				</InputContainer>
				<InputContainer>
					<label >Mobile number</label>
					<input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
				</InputContainer>
				<InputContainer>
					<label >Email</label>
					<input type="email" placeholder='example@example.com' value={email} onChange={(e) => setEmail(e.target.value)} />
				</InputContainer>
				<InputContainer>
					<label >Password</label>
					<input type="password" placeholder='Atleast 6 characters' value={password} onChange={(e) => setPassword(e.target.value)} />
				</InputContainer>
				<Infotext>
					By enrolling your mobile phone number, you consent to receive automated security notifications via text message from paper-bag. Message and data rates may apply.
				</Infotext>
				<Button onClick={signup}>Continue</Button>
				<Infotext>

					Already have an account? <span onClick={() => nav('/login')}>Sign in
					</span> <br /> Buying for work? <span>Create a free business account</span>
				</Infotext>
			</FormContainer>
		</Container>
	)
}
const Container = styled.div`
	width: 55%;
	height: fit-content;
	padding: 15px;
	margin: auto;
	display: flex;
	flex-direction: column;
	align-items: center;
`;
const FormContainer = styled.form`
	border: 1px solid lightgray;
	width: 55%;
	height: fit-content;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 15px;
	h3 {
		font-size: 25px;
		font-weight: 400;
		line-height: 33px;
		align-self: flex-start;
		margin-bottom: 10px;
	}
	@media (max-width: 540px) {
		width: 100%;
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
const Infotext = styled.div`
	font-size: 13px;
    width: 100%;
	word-wrap: normal;
	word-break-inside: normal;
	margin-top:20px;
	span{
		color: #426bc0;
		cursor: pointer;
		&:hover{
		text-decoration: underline;

		}
	}
`;
const Logo = styled.div`
	width: 120px;
	margin-bottom: 20px;
	img{
		width: 100%;
	}
	p{
		margin: 0px 0px 0px 0px;
		font-weight: bold;
		font-size: 20px;
		@media (max-width: 540px) {
			font-size: 15px;
		}
	}
	@media (max-width: 540px) {
		width: 80px;
	}
`;
const Button = styled.button`
	width: 100%;
	padding: 8px;
    height: 33px;
	background-color: #f0c14b;
	border: none;
	outline: none;
	border-radius: 5px;
	margin-top: 20px;
	cursor: pointer;
    &:hover{
		background-color: #FFD814;
	}
`;
export default SignUp
