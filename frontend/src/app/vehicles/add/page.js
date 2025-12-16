"use client"
import { useState } from "react"
export default function AddVehicle(){
	const [customer_id, setCustomerId] = useState("");
	const [make, setMake] = useState("");
	const [model, setModel] = useState("");
	const [year, setYear] = useState("");
	const [license_plate, setLicensePlate] = useState("")
	const [mileage, setMileage] = useState('');
	const [last_service_date, setLast] = useState('');
	function handleAddForm(e){
		e.preventDefault();
		async function postData(){
			const res = await fetch("http://127.0.0.1:8000/vehicles/",
				{
					method : 'POST', 
					headers : {
						'Content-Type' : 'application/json',
					},
					body : JSON.stringify({customer_id, make, model, year,license_plate, mileage, last_service_date})
				}
			)
		}
		postData()
	}
	return (
		<>
			<form onSubmit={handleAddForm}>
				<input 
					value={customer_id} 
					type="number" 
					placeholder="Enter customer ID" 
					onChange={(e) => {setCustomerId(e.target.value)}}
				></input>

				<input 
					value={make} 
					type="text" 
					placeholder="Enter make" 
					onChange={(e) => {setMake(e.target.value)}}
				></input>

				<input 
					value={model} 
					type="text" 
					placeholder="Enter model" 
					onChange={(e) => {setModel(e.target.value)}}
				></input>


				<input 
					value={year} 
					type="text" 
					placeholder="Enter year" 
					onChange={(e) => {setYear(e.target.value)}}
				></input>

				<input 
					value={license_plate} 
					type="text" 
					placeholder="Enter License" 
					onChange={(e) => {setLicensePlate(e.target.value)}}
				></input>

				<input 
					value={mileage} 
					type="number" 
					placeholder="Enter mileage" 
					onChange={(e) => {setMileage(e.target.value)}}
				></input>
				
				<input 
					value={last_service_date} 
					type="date" 
					placeholder="Enter date" 
					onChange={(e) => {setLast(e.target.value)}}
				></input>
				<br></br>
				<button type="submit">Add Vehicle</button>
			
			</form>
		</>
	)
	




}