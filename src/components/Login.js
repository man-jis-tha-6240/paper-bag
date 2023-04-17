import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from '../Axios';
import {useStateValue} from '../StateProvider';
function Login() {
	const nav = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [{},dispatch]=useStateValue();
	const login = (e) => {
		e.preventDefault();
	
		axios
		  .post("https://paper-bag.onrender.com/auth/login", { email, password })
		  .then((res) => {
			if (!res.data.error) {
			  dispatch({
				type: "SET_USER",
				user: res.data,
			  });
	
			  localStorage.setItem("user", JSON.stringify(res.data));
	
			  nav("/");
			} else if (res.data.error) {
			  alert(res.data.error);
			}
		  })
		  .catch((err) => console.warn(err));
	  };
	return (
		<Container>
			<Logo>
				<img src="my_logo.png" alt="" />
				<p>paper-bag</p>
			</Logo>
			<FormContainer>
				<h3>Sign in</h3>
				<InputContainer>
					<label >Email</label>
					<input type="email" placeholder='example@example.com' value={email} onChange={(e) => setEmail(e.target.value)} />
				</InputContainer>
				<InputContainer>
					<label >Password</label>
					<input type="password" placeholder='********' value={password} onChange={(e) => setPassword(e.target.value)} />
				</InputContainer>
				<LogInButton onClick={login}>Log in</LogInButton>
				<Infotext>
				By continuing, you agree to paper-bag's <span>Conditions of Use </span>and <span>Privacy Notice</span>
				</Infotext>
			</FormContainer>
			<SignUpButton onClick={()=>nav('/signup')}>Create your paper-bag account</SignUpButton>
		</Container>
	)
}
const Container = styled.div`
	width: fit-content;
	padding: 15px;
	margin: auto;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;
const FormContainer = styled.form`
	border: 1px solid lightgray;
	width: 75%;
	height: fit-content;
	box-sizing: border-box;
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
const SignUpButton = styled.button`
	width: 75%;
	height: 35px;
	font-size: 12px;
	margin-top: 20px;
	cursor: pointer;
	&:hover{
		background-color: #dfdfdf;
		border: 1px solid gray
	}
`;
const LogInButton = styled.button`
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
export default Login
