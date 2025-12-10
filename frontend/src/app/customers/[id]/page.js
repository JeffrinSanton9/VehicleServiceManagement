"use client"
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function Page(){
	const {id} = useParams()
	const [customer, setCustomer] = useState(null)
	const [vehicles, setVehicles] = useState([])
	useEffect(() => {
		async function loadCustomerData(){
			const url = `http://127.0.0.1:8000/customers/id/${id}`;
			const customer = await fetch(url,
				{
					cache : "no-store"
				}
			);
			const customerJson = await customer.json();
			setCustomer(customerJson)
		}
		async function loadVehicleData(){
			const url = `http://127.0.0.1:8000/vehicles/customer/${id}`;
			const vehicles = await fetch(url,
				{
					cache : "no-store"
				}
			);
			const vehiclesJson = await vehicles.json();
			setVehicles(vehiclesJson)
		}
		loadCustomerData();
		loadVehicleData();
	}, [id])
	console.log("Array or wot ? ", Array.isArray(vehicles))
	if(customer === null || vehicles === null){
		return <h1>Loading..</h1>
	}
	return(
		<div>
			<h1>Customer Details</h1>
			<br />
			<ul>
				<li>Name : {customer.name}</li>
				<li>Email : {customer.email}</li>
				<li>Phone : {customer.phone}</li>
				<li>Addcustomers : {customer.address}</li>
			</ul>
			<h1>Customer's Vehicles</h1>
			<br />
			<ul>
				{Array.isArray(vehicles) && vehicles.map((item) => (
					<li key={item.id}>
						Make : {item.make}<br></br>
						Model : {item.model}<br></br>
						Year : {item.year}<br></br>
						License Plate : {item.license_plate}<br></br>
						Mileage : {item.mileage}<br></br>
						Service Date : {item.last_service_date}<br></br>
					</li>
				))}
			</ul>
			<br />
			<button onClick={handleAddVehicle}>Add Vehicle</button>

		</div>
	)
}
