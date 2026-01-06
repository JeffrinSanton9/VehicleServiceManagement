"use client"
import { useState } from "react"
import Link from "next/link"

export default function Reports(){
	const [searchType, setSearchType] = useState("customer")
	const [searchQuery, setSearchQuery] = useState("")
	const [results, setResults] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState("")
	const [fromDate, setFromDate] = useState("")
	const [toDate, setToDate] = useState("")
	const [minCost, setMinCost] = useState("")
	const [maxCost, setMaxCost] = useState("")

	async function handleSearch(e){
		e.preventDefault();
		setLoading(true);
		setError("");
		setResults([]);

		try {
			let url = "";
			
			if(searchType === "customer"){
				url = `http://127.0.0.1:8000/customers/search?email=${searchQuery}`;
			} else if(searchType === "vehicle"){
				url = `http://127.0.0.1:8000/vehicles/filter?make=${searchQuery}`;
			} else if(searchType === "booking"){
				url = `http://127.0.0.1:8000/booking/`;
			}

			const res = await fetch(url, { cache: "no-store" });
			if(res.ok){
				const data = await res.json();
				
				// Apply date and cost filters for bookings
				if(searchType === "booking"){
					let filtered = Array.isArray(data) ? data : [data];
					
					if(fromDate){
						filtered = filtered.filter(b => new Date(b.scheduled_date) >= new Date(fromDate));
					}
					if(toDate){
						filtered = filtered.filter(b => new Date(b.scheduled_date) <= new Date(toDate));
					}
					if(minCost){
						filtered = filtered.filter(b => (b.estimated_cost || 0) >= parseFloat(minCost));
					}
					if(maxCost){
						filtered = filtered.filter(b => (b.estimated_cost || 0) <= parseFloat(maxCost));
					}
					
					setResults(filtered);
				} else {
					setResults(Array.isArray(data) ? data : [data]);
				}
			} else {
				setError("No results found");
			}
		} catch(err){
			console.error("Search error:", err);
			setError("Search failed. Please try again.");
		}
		setLoading(false);
	}

	function exportResults(){
		if(results.length === 0){
			alert("No results to export");
			return;
		}

		const csv = [
			Object.keys(results[0]).join(","),
			...results.map(item => Object.values(item).join(","))
		].join("\n");

		const blob = new Blob([csv], { type: "text/csv" });
		const url = window.URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `search_results_${new Date().toISOString().split('T')[0]}.csv`;
		a.click();
		window.URL.revokeObjectURL(url);
	}

	return(
		<main className="min-h-screen bg-gradient-to-br from-blue-100 via-pink-100 to-yellow-100 py-10 px-4">
			<div className="bg-white/90 p-10 rounded-3xl shadow-2xl w-full max-w-5xl mx-auto border-4 border-indigo-300">
				<h1 className="text-5xl font-black bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-500 text-transparent bg-clip-text mb-8 text-center tracking-wider uppercase">Search & Reports</h1>

				<form onSubmit={handleSearch} className="flex flex-col gap-6 mb-8">
					<div className="flex flex-col gap-3">
						<label className="font-bold text-indigo-700 text-lg">Search Type</label>
						<div className="flex gap-4 flex-wrap">
							<label className="flex items-center gap-2 cursor-pointer">
								<input 
									type="radio"
									value="customer"
									checked={searchType === "customer"}
									onChange={(e) => {setSearchType(e.target.value); setResults([]); }}
									className="w-4 h-4"
								/>
								<span className="font-semibold">Customer</span>
							</label>
							<label className="flex items-center gap-2 cursor-pointer">
								<input 
									type="radio"
									value="vehicle"
									checked={searchType === "vehicle"}
									onChange={(e) => {setSearchType(e.target.value); setResults([]);}}
									className="w-4 h-4"
								/>
								<span className="font-semibold">Vehicle</span>
							</label>
							<label className="flex items-center gap-2 cursor-pointer">
								<input 
									type="radio"
									value="booking"
									checked={searchType === "booking"}
									onChange={(e) => {setSearchType(e.target.value); setResults([]);}}
									className="w-4 h-4"
								/>
								<span className="font-semibold">Booking</span>
							</label>
						</div>
					</div>

					{searchType !== "booking" && (
						<div className="flex flex-col gap-3">
							<label className="font-bold text-indigo-700 text-lg">
								{searchType === "customer" ? "Email or Name" : "Make or Model"}
							</label>
							<input 
								type="text"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								placeholder={searchType === "customer" ? "Enter email or name" : "Enter make or model"}
								className="w-full px-6 py-3 rounded-2xl border-2 border-indigo-200 focus:ring-2 focus:ring-indigo-400 focus:outline-none bg-gray-50 text-lg font-semibold"
							/>
						</div>
					)}

					{searchType === "booking" && (
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="flex flex-col gap-3">
								<label className="font-bold text-indigo-700">From Date</label>
								<input 
									type="date"
									value={fromDate}
									onChange={(e) => setFromDate(e.target.value)}
									className="w-full px-6 py-3 rounded-2xl border-2 border-indigo-200 focus:ring-2 focus:ring-indigo-400 focus:outline-none bg-gray-50 text-lg"
								/>
							</div>
							<div className="flex flex-col gap-3">
								<label className="font-bold text-indigo-700">To Date</label>
								<input 
									type="date"
									value={toDate}
									onChange={(e) => setToDate(e.target.value)}
									className="w-full px-6 py-3 rounded-2xl border-2 border-indigo-200 focus:ring-2 focus:ring-indigo-400 focus:outline-none bg-gray-50 text-lg"
								/>
							</div>
							<div className="flex flex-col gap-3">
								<label className="font-bold text-indigo-700">Min Cost</label>
								<input 
									type="number"
									step="0.01"
									value={minCost}
									onChange={(e) => setMinCost(e.target.value)}
									placeholder="Min cost"
									className="w-full px-6 py-3 rounded-2xl border-2 border-indigo-200 focus:ring-2 focus:ring-indigo-400 focus:outline-none bg-gray-50 text-lg"
								/>
							</div>
							<div className="flex flex-col gap-3">
								<label className="font-bold text-indigo-700">Max Cost</label>
								<input 
									type="number"
									step="0.01"
									value={maxCost}
									onChange={(e) => setMaxCost(e.target.value)}
									placeholder="Max cost"
									className="w-full px-6 py-3 rounded-2xl border-2 border-indigo-200 focus:ring-2 focus:ring-indigo-400 focus:outline-none bg-gray-50 text-lg"
								/>
							</div>
						</div>
					)}

					<button 
						type="submit"
						disabled={loading}
						className="w-full py-3 rounded-full bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-500 text-white font-black shadow-xl hover:scale-105 transition-transform text-lg tracking-wider uppercase disabled:opacity-60 disabled:cursor-not-allowed"
					>
						{loading ? "Searching..." : "Search"}
					</button>
				</form>

				{error && <div className="text-red-600 font-bold text-center text-lg bg-red-100 p-4 rounded-lg mb-6">{error}</div>}

				{results.length > 0 && (
					<>
						<div className="flex justify-between items-center mb-4">
							<p className="text-lg font-bold text-indigo-700">Found {results.length} result(s)</p>
							<button 
								onClick={exportResults}
								className="px-6 py-2 rounded-lg bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold hover:scale-105 transition-transform"
							>
								Export to CSV
							</button>
						</div>

						{searchType === "customer" ? (
							<div className="overflow-x-auto">
								<table className="w-full text-sm text-left">
									<thead className="bg-gradient-to-r from-indigo-100 to-pink-100">
										<tr>
											<th className="px-4 py-3 font-bold text-indigo-700">ID</th>
											<th className="px-4 py-3 font-bold text-indigo-700">Name</th>
											<th className="px-4 py-3 font-bold text-indigo-700">Email</th>
											<th className="px-4 py-3 font-bold text-indigo-700">Phone</th>
											<th className="px-4 py-3 font-bold text-indigo-700">Address</th>
										</tr>
									</thead>
									<tbody>
										{results.map((customer) => (
											<tr key={customer.id} className="even:bg-white odd:bg-gray-50 hover:bg-yellow-50 transition-colors border-b">
												<td className="px-4 py-3 font-bold">{customer.id}</td>
												<td className="px-4 py-3">{customer.name}</td>
												<td className="px-4 py-3">{customer.email}</td>
												<td className="px-4 py-3">{customer.phone}</td>
												<td className="px-4 py-3">{customer.address}</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						) : searchType === "vehicle" ? (
							<div className="overflow-x-auto">
								<table className="w-full text-sm text-left">
									<thead className="bg-gradient-to-r from-indigo-100 to-pink-100">
										<tr>
											<th className="px-4 py-3 font-bold text-indigo-700">ID</th>
											<th className="px-4 py-3 font-bold text-indigo-700">Customer</th>
											<th className="px-4 py-3 font-bold text-indigo-700">Make</th>
											<th className="px-4 py-3 font-bold text-indigo-700">Model</th>
											<th className="px-4 py-3 font-bold text-indigo-700">Year</th>
											<th className="px-4 py-3 font-bold text-indigo-700">License Plate</th>
										</tr>
									</thead>
									<tbody>
										{results.map((vehicle) => (
											<tr key={vehicle.id} className="even:bg-white odd:bg-gray-50 hover:bg-yellow-50 transition-colors border-b">
												<td className="px-4 py-3 font-bold">{vehicle.id}</td>
												<td className="px-4 py-3">{vehicle.customer_id}</td>
												<td className="px-4 py-3">{vehicle.make}</td>
												<td className="px-4 py-3">{vehicle.model}</td>
												<td className="px-4 py-3">{vehicle.year}</td>
												<td className="px-4 py-3">{vehicle.license_plate}</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						) : (
							<div className="overflow-x-auto">
								<table className="w-full text-sm text-left">
									<thead className="bg-gradient-to-r from-indigo-100 to-pink-100">
										<tr>
											<th className="px-4 py-3 font-bold text-indigo-700">ID</th>
											<th className="px-4 py-3 font-bold text-indigo-700">Vehicle</th>
											<th className="px-4 py-3 font-bold text-indigo-700">Service Type</th>
											<th className="px-4 py-3 font-bold text-indigo-700">Date</th>
											<th className="px-4 py-3 font-bold text-indigo-700">Status</th>
											<th className="px-4 py-3 font-bold text-indigo-700">Cost</th>
										</tr>
									</thead>
									<tbody>
										{results.map((booking) => (
											<tr key={booking.id} className="even:bg-white odd:bg-gray-50 hover:bg-yellow-50 transition-colors border-b">
												<td className="px-4 py-3 font-bold">{booking.id}</td>
												<td className="px-4 py-3">{booking.vehicle_id}</td>
												<td className="px-4 py-3">{booking.service_type}</td>
												<td className="px-4 py-3">{new Date(booking.scheduled_date).toLocaleDateString()}</td>
												<td className="px-4 py-3">
													<span className={`px-2 py-1 rounded text-white text-xs font-bold ${
														booking.status === "Pending" ? 'bg-yellow-500' :
														booking.status === "In Progress" ? 'bg-blue-500' :
														booking.status === "Completed" ? 'bg-green-500' :
														'bg-red-500'
													}`}>
														{booking.status}
													</span>
												</td>
												<td className="px-4 py-3">${booking.estimated_cost || "N/A"}</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						)}
					</>
				)}

				{results.length === 0 && !error && !loading && (
					<div className="text-center text-gray-600 py-10 text-lg">Start searching to see results</div>
				)}
			</div>
		</main>
	)
}
