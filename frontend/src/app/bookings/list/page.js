"use client"
import { useState, useEffect } from "react"
import Link from "next/link"

export default function BookingList(){
	const [bookings, setBookings] = useState([])
	const [filteredBookings, setFilteredBookings] = useState([])
	const [statusFilter, setStatusFilter] = useState("All")
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState("")

	useEffect(() => {
		loadBookings();
	}, []);

	async function loadBookings(){
		try{
			setLoading(true);
			const res = await fetch("http://127.0.0.1:8000/booking/", {
				cache: "no-store"
			});
			if(res.ok){
				const data = await res.json();
				setBookings(data);
				setFilteredBookings(data);
			} else {
				setError("Failed to load bookings");
			}
		} catch(err){
			console.error("Error loading bookings:", err);
			setError("Network error. Please try again.");
		} finally {
			setLoading(false);
		}
	}

	function handleStatusFilter(status){
		setStatusFilter(status);
		if(status === "All"){
			setFilteredBookings(bookings);
		} else {
			setFilteredBookings(bookings.filter(b => b.status === status));
		}
	}

	function handleSort(sortBy){
		let sorted = [...filteredBookings];
		if(sortBy === "date"){
			sorted.sort((a, b) => new Date(a.scheduled_date) - new Date(b.scheduled_date));
		} else if(sortBy === "cost"){
			sorted.sort((a, b) => (b.estimated_cost || 0) - (a.estimated_cost || 0));
		}
		setFilteredBookings(sorted);
	}

	async function handleStatusUpdate(bookingId, newStatus){
		try{
			const res = await fetch(`http://127.0.0.1:8000/booking/${bookingId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ status: newStatus })
			});
			if(res.ok){
				loadBookings();
			}
		} catch(err){
			console.error("Error updating booking:", err);
		}
	}

	if(loading){
		return <div className="flex items-center justify-center min-h-screen text-2xl font-bold">Loading...</div>
	}

	return(
		<main className="min-h-screen bg-gradient-to-br from-blue-100 via-pink-100 to-yellow-100 py-10 px-4">
			<div className="bg-white/90 p-8 rounded-3xl shadow-2xl w-full max-w-6xl mx-auto border-4 border-indigo-300">
				<h1 className="text-4xl font-black bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-500 text-transparent bg-clip-text mb-8 text-center tracking-wider uppercase">Service Bookings</h1>
				
				{error && <div className="text-red-600 font-bold text-center text-lg bg-red-100 p-4 rounded-lg mb-6">{error}</div>}

				<div className="flex flex-wrap gap-4 mb-8 justify-center">
					<button 
						onClick={() => handleStatusFilter("All")}
						className={`px-6 py-2 rounded-lg font-bold transition-all ${statusFilter === "All" ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-800'}`}
					>
						All ({bookings.length})
					</button>
					<button 
						onClick={() => handleStatusFilter("Pending")}
						className={`px-6 py-2 rounded-lg font-bold transition-all ${statusFilter === "Pending" ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-800'}`}
					>
						Pending ({bookings.filter(b => b.status === "Pending").length})
					</button>
					<button 
						onClick={() => handleStatusFilter("In Progress")}
						className={`px-6 py-2 rounded-lg font-bold transition-all ${statusFilter === "In Progress" ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
					>
						In Progress ({bookings.filter(b => b.status === "In Progress").length})
					</button>
					<button 
						onClick={() => handleStatusFilter("Completed")}
						className={`px-6 py-2 rounded-lg font-bold transition-all ${statusFilter === "Completed" ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800'}`}
					>
						Completed ({bookings.filter(b => b.status === "Completed").length})
					</button>
					<button 
						onClick={() => handleStatusFilter("Cancelled")}
						className={`px-6 py-2 rounded-lg font-bold transition-all ${statusFilter === "Cancelled" ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-800'}`}
					>
						Cancelled ({bookings.filter(b => b.status === "Cancelled").length})
					</button>
				</div>

				<div className="flex gap-4 mb-6 justify-center">
					<button 
						onClick={() => handleSort("date")}
						className="px-6 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-bold shadow hover:scale-105 transition-transform"
					>
						Sort by Date
					</button>
					<button 
						onClick={() => handleSort("cost")}
						className="px-6 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-bold shadow hover:scale-105 transition-transform"
					>
						Sort by Cost
					</button>
				</div>

				{filteredBookings.length === 0 ? (
					<div className="text-center text-xl text-gray-600 py-10">No bookings found</div>
				) : (
					<div className="overflow-x-auto">
						<table className="w-full text-sm text-left">
							<thead className="bg-gradient-to-r from-indigo-100 to-pink-100">
								<tr>
									<th className="px-4 py-3 font-bold text-indigo-700">ID</th>
									<th className="px-4 py-3 font-bold text-indigo-700">Vehicle</th>
									<th className="px-4 py-3 font-bold text-indigo-700">Service Type</th>
									<th className="px-4 py-3 font-bold text-indigo-700">Scheduled Date</th>
									<th className="px-4 py-3 font-bold text-indigo-700">Status</th>
									<th className="px-4 py-3 font-bold text-indigo-700">Est. Cost</th>
									<th className="px-4 py-3 font-bold text-indigo-700">Action</th>
								</tr>
							</thead>
							<tbody>
								{filteredBookings.map((booking) => (
									<tr key={booking.id} className="even:bg-white odd:bg-gray-50 hover:bg-yellow-50 transition-colors border-b">
										<td className="px-4 py-3 font-bold text-indigo-800">{booking.id}</td>
										<td className="px-4 py-3 text-blue-800">{booking.vehicle_id}</td>
										<td className="px-4 py-3 text-gray-800">{booking.service_type}</td>
										<td className="px-4 py-3 text-gray-800">{new Date(booking.scheduled_date).toLocaleDateString()}</td>
										<td className="px-4 py-3">
											<select 
												value={booking.status}
												onChange={(e) => handleStatusUpdate(booking.id, e.target.value)}
												className={`px-3 py-1 rounded-lg font-bold text-white text-sm ${
													booking.status === "Pending" ? 'bg-yellow-500' :
													booking.status === "In Progress" ? 'bg-blue-500' :
													booking.status === "Completed" ? 'bg-green-500' :
													'bg-red-500'
												}`}
											>
												<option value="Pending">Pending</option>
												<option value="In Progress">In Progress</option>
												<option value="Completed">Completed</option>
												<option value="Cancelled">Cancelled</option>
											</select>
										</td>
										<td className="px-4 py-3 text-gray-800">${booking.estimated_cost || "N/A"}</td>
										<td className="px-4 py-3">
											<button 
												onClick={() => {
													// Delete functionality
													if(confirm("Are you sure you want to delete this booking?")){
														fetch(`http://127.0.0.1:8000/booking/${booking.id}`, {method: 'DELETE'})
															.then(() => loadBookings())
															.catch(err => console.error("Error deleting:", err));
													}
												}}
												className="px-3 py-1 bg-red-500 text-white rounded-lg font-bold hover:bg-red-600 transition"
											>
												Delete
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}

				<Link href="/bookings/create">
					<button className="mt-8 w-full py-3 rounded-full bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-500 text-white font-black shadow-xl hover:scale-105 transition-transform text-lg tracking-wider uppercase">
						Create New Booking
					</button>
				</Link>
			</div>
		</main>
	)
}
