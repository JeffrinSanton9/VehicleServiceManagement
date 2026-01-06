"use client"
import { useEffect } from "react";
import { useState } from "react";
import Link from "next/link";

export default function ListVehicle(){
	const [vehicleListJson, setVehicleJson] = useState([]);
	const [customerId, setCustomerId] = useState("")
	const [vehicleId, setVehicleId] = useState("")
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() =>{
		async function loadData(){
			try{
				setLoading(true);
				const vehicleList = await fetch("http://127.0.0.1:8000/vehicles/", {
					cache : "no-store"
				})
				const data = await vehicleList.json();
				setVehicleJson(data);
			} catch(err){
				console.error("Error loading vehicles:", err);
				setError("Failed to load vehicles");
			} finally {
				setLoading(false);
			}
		}
		loadData();
	}, [])

	function handleCustomerSearch(e){
		e.preventDefault();
		if(!customerId){
			alert("Please enter a customer ID");
			return;
		}
		async function loadData(){
			try{
				setLoading(true);
				const vehicle = await fetch(`http://127.0.0.1:8000/vehicles/customer/${customerId}`);
				const data = await vehicle.json();
				setVehicleJson(data);
				setError("");
			} catch(err){
				console.error("Error:", err);
				setError("No vehicles found for this customer");
				setVehicleJson([]);
			} finally {
				setLoading(false);
			}
		}
		loadData();
	}

	function handleVehicleSearch(e){
		e.preventDefault()
		if(!vehicleId){
			alert("Please enter a vehicle ID");
			return;
		}
		async function loadData(){
			try{
				setLoading(true);
				const vehicle = await fetch(`http://127.0.0.1:8000/vehicles/id/${vehicleId}`);
				const data = await vehicle.json();
				setVehicleJson([data]);
				setError("");
			} catch(err){
				console.error("Error:", err);
				setError("Vehicle not found");
				setVehicleJson([]);
			} finally {
				setLoading(false);
			}
		}
		loadData()
	}

	async function handleDelete(vehicleId){
		if(confirm("Are you sure you want to delete this vehicle?")){
			try{
				await fetch(`http://127.0.0.1:8000/vehicles/${vehicleId}`, {
					method: 'DELETE'
				});
				setVehicleJson(vehicleListJson.filter(v => v.id !== vehicleId));
			} catch(err){
				console.error("Error deleting vehicle:", err);
				setError("Failed to delete vehicle");
			}
		}
	}

	if(loading && vehicleListJson.length === 0){
		return <div className="flex items-center justify-center min-h-screen text-2xl font-bold">Loading...</div>
	}

	return (
		<main className="min-h-screen bg-gradient-to-br from-blue-100 via-pink-100 to-yellow-100 py-10 px-4">
			<div className="bg-white/90 p-8 rounded-3xl shadow-2xl w-full max-w-6xl mx-auto border-4 border-blue-300">
				<h1 className="text-4xl font-black bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-500 text-transparent bg-clip-text mb-8 text-center uppercase tracking-wider">Vehicle Inventory</h1>

				{error && <div className="text-red-600 font-bold text-center text-lg bg-red-100 p-4 rounded-lg mb-6">{error}</div>}

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
					<form onSubmit={handleCustomerSearch} className="flex flex-col gap-3 bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-2xl border-2 border-blue-200">
						<h3 className="text-xl font-bold text-blue-700 mb-2">Search By Customer ID</h3>
						<div className="flex gap-2">
							<input
								value={customerId}
								onChange={(e) => (setCustomerId(e.target.value))}
								type="number"
								placeholder="Enter customer ID"
								className="flex-1 px-4 py-2 rounded-lg border-2 border-blue-200 focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white"
							/>
							<button type="submit" className="px-6 py-2 bg-blue-500 text-white rounded-lg font-bold hover:scale-105 transition">Search</button>
						</div>
					</form>

					<form onSubmit={handleVehicleSearch} className="flex flex-col gap-3 bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border-2 border-green-200">
						<h3 className="text-xl font-bold text-green-700 mb-2">Search By Vehicle ID</h3>
						<div className="flex gap-2">
							<input
								value={vehicleId}
								placeholder="Enter Vehicle ID"
								type="number"
								onChange={(e) => (setVehicleId(e.target.value))}
								className="flex-1 px-4 py-2 rounded-lg border-2 border-green-200 focus:ring-2 focus:ring-green-400 focus:outline-none bg-white"
							/>
							<button type="submit" className="px-6 py-2 bg-green-500 text-white rounded-lg font-bold hover:scale-105 transition">Search</button>
						</div>
					</form>
				</div>

				{vehicleListJson.length === 0 ? (
					<div className="text-center text-lg text-gray-600 py-10">No vehicles found</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
						{vehicleListJson.map(item => (
							<div key={item.id} className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border-2 border-blue-300 shadow-md hover:shadow-lg transition">
								<div className="flex justify-between items-start mb-4">
									<h3 className="text-2xl font-bold text-blue-700">{item.make} {item.model}</h3>
									<button 
										onClick={() => handleDelete(item.id)}
										className="px-3 py-1 bg-red-500 text-white rounded-lg font-bold text-sm hover:bg-red-600 transition"
									>
										Delete
									</button>
								</div>
								<div className="space-y-2 text-gray-800">
									<p><span className="font-bold text-blue-700">Vehicle ID:</span> {item.id}</p>
									<p><span className="font-bold text-blue-700">Customer ID:</span> {item.customer_id}</p>
									<p><span className="font-bold text-blue-700">Year:</span> {item.year}</p>
									<p><span className="font-bold text-blue-700">License Plate:</span> <span className="bg-yellow-200 px-2 py-1 rounded font-bold">{item.license_plate}</span></p>
									<p><span className="font-bold text-blue-700">Mileage:</span> {item.mileage} km</p>
									<p><span className="font-bold text-blue-700">Last Service Date:</span> {item.last_service_date || "N/A"}</p>
								</div>
							</div>
						))}
					</div>
				)}

				<Link href="/vehicles/add">
					<button className="w-full py-3 rounded-full bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-500 text-white font-black shadow-xl hover:scale-105 transition-transform text-lg tracking-wider uppercase">
						Add New Vehicle
					</button>
				</Link>
			</div>
		</main>
	)
}