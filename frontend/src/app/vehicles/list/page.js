"use client"
import { useEffect } from "react";
import { useState } from "react";
export default function ListVehicle(){
	const [vehicleListJson, setVehicleJson] = useState([]);
	const [customerId, setCustomerId] = useState("")
	const [vehicleId, setVehicleId] = useState("")

	useEffect(() =>{
		async function loadData(){
			const vehicleList = await fetch("http://127.0.0.1:8000/vehicles/", {
				cache : "no-store"
			})

			const data = await vehicleList.json();
			setVehicleJson(data);
		}
		loadData();
	}, [])

	function handleCustomerSearch(e){
		e.preventDefault();
		async function loadData(){
			const vehicle = await fetch(`http://127.0.0.1:8000/vehicles/customer/${customerId}`);
			const data = await vehicle.json();
			setVehicleJson(data);
		}
		loadData();
	}
	function handleVehicleSearch(e){
		e.preventDefault()
		async function loadData(){
			const vehicle = await fetch(`http://127.0.0.1:8000/vehicles/id/${vehicleId}`);
			const data = await vehicle.json();
			setVehicleJson([data]);
		}	
		loadData()
	}
	return (
		<>
			<h1>Search By Customer</h1>
			<form onSubmit={handleCustomerSearch}>
				<input
				 	value={customerId}
					onChange={(e) => (setCustomerId(e.target.value))}
					type="number"
					placeholder="Enter customer ID"
				></input>
			</form>

			<h1>Search By Vehicle</h1>
			<form onSubmit={handleVehicleSearch}>
				<input
					value={vehicleId}
					placeholder="Enter Vehicle ID"
					type="number"
					onChange={(e) => (setVehicleId(e.target.value))}
				></input>
			</form>
			<h1>Customer List</h1>
			<br></br>
			<ul>
				{vehicleListJson.map(item => (
					<li key={item.id}>
						Vehicle id : {item.id} <br></br>
						Customer id : {item.customer_id} <br></br>
						Make : {item.make}<br></br>
						Model : {item.model} <br></br>
						Year : {item.year}<br></br>
						License Plate : {item.license_plate}<br></br>
						Mileage : {item.mileage}<br></br>
						Last Serviced Date : {item.last_service_date}<br></br>
						<br></br>
					</li>
				))}	
			</ul>	

		</>
	)

}