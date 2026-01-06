"use client"
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

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
	
	if(customer === null){
		return <div className="flex items-center justify-center min-h-screen text-2xl font-bold">Loading..</div>
	}
	
	return(
		<main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-pink-100 to-yellow-100 py-10 px-4">
			<div className="w-full max-w-3xl mx-auto bg-white/90 p-10 rounded-3xl shadow-2xl border-4 border-indigo-300">
				<h1 className="text-4xl font-black bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-500 text-transparent bg-clip-text mb-8 text-center tracking-wider uppercase">Customer Details</h1>
				
				<div className="bg-gradient-to-r from-indigo-50 to-pink-50 p-8 rounded-2xl mb-8 border-2 border-indigo-200">
					<ul className="space-y-4">
						<li className="text-lg"><span className="font-bold text-indigo-700">Name:</span> {customer.name}</li>
						<li className="text-lg"><span className="font-bold text-indigo-700">Email:</span> {customer.email}</li>
						<li className="text-lg"><span className="font-bold text-indigo-700">Phone:</span> {customer.phone}</li>
						<li className="text-lg"><span className="font-bold text-indigo-700">Address:</span> {customer.address}</li>
					</ul>
				</div>

				<h2 className="text-3xl font-black text-indigo-700 mb-6 tracking-wide">Customer's Vehicles</h2>
				
				{Array.isArray(vehicles) && vehicles.length === 0 ? (
					<div className="text-lg text-red-500 font-bold mb-8 bg-red-100 p-4 rounded-lg text-center">No vehicles registered</div>
				) : (
					<div className="space-y-4 mb-8">
						{Array.isArray(vehicles) && vehicles.map((item) => (
							<div key={item.id} className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-xl border-2 border-blue-200 shadow-md">
								<div className="grid grid-cols-2 gap-4">
									<div><span className="font-bold text-blue-700">Make:</span> {item.make}</div>
									<div><span className="font-bold text-blue-700">Model:</span> {item.model}</div>
									<div><span className="font-bold text-blue-700">Year:</span> {item.year}</div>
									<div><span className="font-bold text-blue-700">License Plate:</span> {item.license_plate}</div>
									<div><span className="font-bold text-blue-700">Mileage:</span> {item.mileage} km</div>
									<div><span className="font-bold text-blue-700">Last Service:</span> {item.last_service_date}</div>
								</div>
							</div>
						))}
					</div>
				)}
				
				<div className="flex gap-4 justify-center mt-8">
					<Link href="/vehicles/add">
						<button className="px-8 py-3 rounded-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold shadow-lg hover:scale-105 transition-transform">
							Add Vehicle
						</button>
					</Link>
					<Link href="/customers/list">
						<button className="px-8 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-bold shadow-lg hover:scale-105 transition-transform">
							Back to Customers
						</button>
					</Link>
				</div>
			</div>
		</main>
	)
}
