"use client"

import { useState } from "react"

export default function AddCustomer(){
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [phone, setPhoneNumber] = useState("")
	const [address, setAddress] = useState("")
	async function handleSubmit(e){
		e.preventDefault();
		const res = await fetch("http://127.0.0.1:8000/customers/", {
			method : 'POST',
			headers : {
				'Content-Type' : 'application/json',
			},
			body : JSON.stringify({name, email, phone : phone, address})
		})
	}
	return(
		<div>
			<form onSubmit={handleSubmit}>
				<input 
					type="text"
					placeholder="Enter Name"
					value={name}
					onChange={(e) => (setName(e.target.value))}	
				></input>

				<input
					type="text"
					placeholder="Enter e-mail"
					value={email}
					onChange={(e) => (setEmail(e.target.value))}	
				></input>

				<input
					type="text"
					placeholder="Enter Phone Number"
					value={phone}
					onChange={(e) => (setPhoneNumber(e.target.value))}	
				></input>

				<input
					type="text"
					placeholder="Enter "
					value={address}
					onChange={(e) => (setAddress(e.target.value))}	
				></input>
			
				<button type="submit">Submit</button>

			</form>
		</div>
	)
}