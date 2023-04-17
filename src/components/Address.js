import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useStateValue } from '../StateProvider';
import Navbar from './Navbar';
function Address() {
	const nav= useNavigate();
	const [{ }, dispatch] = useStateValue();
	const [fullname, setFullname] = useState('')
	const [phone, setPhone] = useState('')
	const [pincode, setPincode] = useState('')
	const [flat, setFlat] = useState('')
	const [area, setArea] = useState('')
	const [landmark, setLandmark] = useState('')
	const [city, setCity] = useState('')
	const [state, setState] = useState('')
	const deliver=()=>{
		dispatch({
            type: 'SET_ADDRESS',
            item: {
                fullname,
                phone,
                pincode,
                flat,
                area,
                landmark,
                city,
				state,
			}
		})
		nav('/payment');
};
	return (
		<Container>
			<Navbar />
			<Main>
				<FormContainer>
					<InputContainer>
						<p>Full Name</p>
						<input type="text" placeholder='John Smith' value={fullname} onChange={(e)=>setFullname(e.target.value)}/>
					</InputContainer>
					<InputContainer>
						<p>Mobile number</p>
						<input type="text" placeholder='' value={phone} onChange={(e)=>setPhone(e.target.value)}/>
					</InputContainer>
					<InputContainer>
						<p>Pincode</p>
						<input type="text" placeholder='6 digits [0-9] PIN code' value={pincode} onChange={(e)=>setPincode(e.target.value)}/>
					</InputContainer>
					<InputContainer>
						<p>Flat, House no., Building, Company, Apartment</p>
						<input type="text" value={flat} onChange={(e)=>setFlat(e.target.value)}/>
					</InputContainer>
					<InputContainer>
						<p>Area, Street, Sector, Village</p>
						<input type="text" pvalue={area} onChange={(e)=>setArea(e.target.value)}/>
					</InputContainer>
					<InputContainer>
						<p>Landmark</p>
						<input type="text" placeholder='E.g. near Apollo Hospital' value={landmark} onChange={(e)=>setLandmark(e.target.value)}/>
					</InputContainer>
					<InputContainer>
						<p>Town/City</p>
						<input type="text" value={city} onChange={(e)=>setCity(e.target.value)}/>
					</InputContainer>
					<InputContainer>
						<p>State</p>
						<input type="text" value={state} onChange={(e)=>setState(e.target.value)}/>
					</InputContainer>
					<button onClick={deliver}>Deliver to this address</button>
				</FormContainer>
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
    padding: 15px;
`;
const InputContainer = styled.div`
	width: 100%;
	padding: 15px;
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
const FormContainer = styled.form`
	display: flex;
    flex-direction: column;
	width: 100%;
	border: 1px solid lightgrey;
	min-width: 400px;
	height: fit-content;
	align-items: center;
	justify-content: center;
	padding: 15px;
	margin: auto;
	background-color: #fff;
	button{
		align-self: flex-start;
		height: 33px;
		width: 250px;
		margin-top: 20px;
		border: none;
		outline: none;
		border-radius: 3px;
		cursor: pointer;
		background-color: #ffa32a;
	}
`;
export default Address
