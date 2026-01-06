"use client"
import { useState, useEffect } from "react"
import Link from "next/link"

export default function AddVehicle(){
	const [customers, setCustomers] = useState([])
	const [customer_id, setCustomerId] = useState("");
	const [make, setMake] = useState("");
	const [model, setModel] = useState("");
	const [year, setYear] = useState("");
	const [license_plate, setLicensePlate] = useState("")
	const [mileage, setMileage] = useState('');
	const [last_service_date, setLast] = useState('');
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		async function loadCustomers(){
			try{
				const res = await fetch("http://127.0.0.1:8000/customers/", {
					cache: "no-store"
				});
				const data = await res.json();
				setCustomers(data);
			} catch(err){
				console.error("Error loading customers:", err);
			}
		}
		loadCustomers();
	}, []);

	function handleAddForm(e){
		e.preventDefault();
		setLoading(true);
		setSuccess(false);
		setError("");

		if(!customer_id || !make || !model || !year || !license_plate){
			setError("Please fill all required fields");
			setLoading(false);
			return;
		}

		async function postData(){
			try{
				const res = await fetch("http://127.0.0.1:8000/vehicles/",
					{
						method : 'POST', 
						headers : {
							'Content-Type' : 'application/json',
						},
						body : JSON.stringify({
							customer_id: parseInt(customer_id), 
							make, 
							model, 
							year: parseInt(year),
							license_plate, 
							mileage: mileage ? parseInt(mileage) : null, 
							last_service_date: last_service_date || null
						})
					}
				);
				if(res.ok){
					setSuccess(true);
					setCustomerId("");
					setMake("");
					setModel("");
					setYear("");
					setLicensePlate("");
					setMileage("");
					setLast("");
				} else {
					setError("Failed to add vehicle. Please try again.");
				}
			} catch(err){
				console.error("Error:", err);
				setError("Network error. Please try again.");
			} finally {
				setLoading(false);
			}
		}
		postData();
	}

	return (
		<div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-pink-100 to-yellow-100 py-10 px-4">
			<form onSubmit={handleAddForm} className="bg-white/90 dark:bg-slate-800/80 p-10 rounded-3xl shadow-2xl w-full max-w-2xl space-y-6 border-4 border-blue-300">
				<h2 className="text-5xl font-black text-blue-700 dark:text-yellow-300 text-center mb-4 tracking-wider uppercase drop-shadow-lg">Add Vehicle</h2>
				{success && <div className="text-green-600 font-bold text-center text-lg bg-green-100 p-4 rounded-lg">Vehicle added successfully!</div>}
				{error && <div className="text-red-600 font-bold text-center text-lg bg-red-100 p-4 rounded-lg">{error}</div>}
				<div className="flex flex-col gap-3">
					<label className="font-bold text-blue-700 text-lg">Select Customer *</label>
					<select 
						value={customer_id} 
						onChange={(e) => setCustomerId(e.target.value)}
						required
						className="w-full px-6 py-3 rounded-2xl border-2 border-blue-200 focus:ring-2 focus:ring-blue-400 focus:outline-none bg-gray-50 text-lg font-semibold"
					>
						<option value="">-- Select a Customer --</option>
						{customers.map((customer) => (
							<option key={customer.id} value={customer.id}>
								{customer.name} ({customer.email})
							</option>
						))}
					</select>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div className="flex flex-col gap-3">
						<label className="font-bold text-blue-700 text-lg">Make *</label>
						<input 
							value={make} 
							type="text" 
							placeholder="e.g., Toyota" 
							onChange={(e) => setMake(e.target.value)}
							required
							className="w-full px-6 py-3 rounded-2xl border-2 border-blue-200 focus:ring-2 focus:ring-blue-400 focus:outline-none bg-gray-50 text-lg font-semibold"
						/>
					</div>
					<div className="flex flex-col gap-3">
						<label className="font-bold text-blue-700 text-lg">Model *</label>
						<input 
							value={model} 
							type="text" 
							placeholder="e.g., Corolla" 
							onChange={(e) => setModel(e.target.value)}
							required
							className="w-full px-6 py-3 rounded-2xl border-2 border-blue-200 focus:ring-2 focus:ring-blue-400 focus:outline-none bg-gray-50 text-lg font-semibold"
						/>
					</div>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div className="flex flex-col gap-3">
						<label className="font-bold text-blue-700 text-lg">Year *</label>
						<input 
							value={year} 
							type="number" 
							min="1900"
							max={new Date().getFullYear()}
							placeholder="e.g., 2020" 
							onChange={(e) => setYear(e.target.value)}
							required
							className="w-full px-6 py-3 rounded-2xl border-2 border-blue-200 focus:ring-2 focus:ring-blue-400 focus:outline-none bg-gray-50 text-lg font-semibold"
						/>
					</div>
					<div className="flex flex-col gap-3">
						<label className="font-bold text-blue-700 text-lg">License Plate *</label>
						<input 
							value={license_plate} 
							type="text" 
							placeholder="e.g., ABC-1234" 
							onChange={(e) => setLicensePlate(e.target.value)}
							required
							className="w-full px-6 py-3 rounded-2xl border-2 border-blue-200 focus:ring-2 focus:ring-blue-400 focus:outline-none bg-gray-50 text-lg font-semibold uppercase"
						/>
					</div>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div className="flex flex-col gap-3">
						<label className="font-bold text-blue-700 text-lg">Mileage (km) (Optional)</label>
						<input 
							value={mileage} 
							type="number" 
							placeholder="e.g., 50000" 
							onChange={(e) => setMileage(e.target.value)}
							className="w-full px-6 py-3 rounded-2xl border-2 border-blue-200 focus:ring-2 focus:ring-blue-400 focus:outline-none bg-gray-50 text-lg font-semibold"
						/>
					</div>
					<div className="flex flex-col gap-3">
						<label className="font-bold text-blue-700 text-lg">Last Service Date (Optional)</label>
						<input 
							value={last_service_date} 
							type="date" 
							onChange={(e) => setLast(e.target.value)}
							className="w-full px-6 py-3 rounded-2xl border-2 border-blue-200 focus:ring-2 focus:ring-blue-400 focus:outline-none bg-gray-50 text-lg font-semibold"
						/>
					</div>
				</div>

				<button 
					type="submit"
					disabled={loading}
					className="w-full py-3 rounded-full bg-gradient-to-r from-blue-500 via-cyan-500 to-green-500 text-white font-black shadow-xl hover:scale-105 transition-transform text-lg tracking-wider uppercase disabled:opacity-60 disabled:cursor-not-allowed mt-4"
				>
					{loading ? "Adding..." : "Add Vehicle"}
				</button>

				<Link href="/vehicles/list">
					<p className="text-center text-blue-600 hover:text-blue-800 font-bold underline">View All Vehicles</p>
				</Link>
			</form>
		</div>
	)
}