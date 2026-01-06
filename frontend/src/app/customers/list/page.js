"use client"
import { useEffect, useState } from "react";
import Link from "next/link";

function CustomerList(){
	const [customerListJson, setCustomerList] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredCustomers, setFilteredCustomers] = useState([]);
	
	useEffect(() => {
		async function loadData(){
			try{
				const customerList = await fetch("http://127.0.0.1:8000/customers/", {
					cache : "no-store"
				});
				const data = await customerList.json();
				setCustomerList(data);
				setFilteredCustomers(data);
			}
			catch(error){
				console.error("Error loading customers", error);
			}
		}
		loadData();
	}, []);
	
	function handleSearch(value){
		setSearchTerm(value);
		const filtered = customerListJson.filter(customer => 
			customer.name.toLowerCase().includes(value.toLowerCase()) ||
			customer.email.toLowerCase().includes(value.toLowerCase()) ||
			customer.phone.includes(value)
		);
		setFilteredCustomers(filtered);
	}

	function handleNameSort(){
		const sorted = [...filteredCustomers].sort((a, b) => (
			a.name.localeCompare(b.name)
		));
		setFilteredCustomers(sorted);
	}

	async function handleDelete(customerId){
		if(confirm("Are you sure you want to delete this customer?")){
			try{
				await fetch(`http://127.0.0.1:8000/customers/${customerId}`, {
					method: 'DELETE'
				});
				setCustomerList(customerListJson.filter(c => c.id !== customerId));
				setFilteredCustomers(filteredCustomers.filter(c => c.id !== customerId));
			} catch(error){
				console.error("Error deleting customer:", error);
			}
		}
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-pink-100 to-yellow-100 py-10 px-4">
			<div className="bg-white/90 p-8 rounded-3xl shadow-2xl w-full max-w-6xl border-4 border-indigo-300">
				<h1 className="text-4xl font-black bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-500 text-transparent bg-clip-text mb-8 text-center uppercase tracking-wider">Customer Management</h1>
				
				<div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-center">
					<input 
						type="text"
						placeholder="Search by name, email, or phone..."
						value={searchTerm}
						onChange={(e) => handleSearch(e.target.value)}
						className="flex-1 px-6 py-3 rounded-2xl border-2 border-indigo-200 focus:ring-2 focus:ring-indigo-400 focus:outline-none bg-gray-50 text-lg"
					/>
					<button 
						onClick={handleNameSort}
						className="px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold shadow hover:scale-105 transition-transform"
					>
						Sort by Name
					</button>
					<Link href="/customers/add">
						<button className="px-6 py-3 rounded-lg bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold shadow hover:scale-105 transition-transform">
							Add Customer
						</button>
					</Link>
				</div>

				{filteredCustomers.length === 0 ? (
					<div className="text-center text-xl text-gray-600 py-10">No customers found</div>
				) : (
					<div className="overflow-x-auto">
						<table className="w-full text-sm text-left font-fira font-semibold">
							<thead>
								<tr className="bg-gradient-to-r from-indigo-100 via-pink-100 to-yellow-100">
									<th className="px-6 py-3 text-indigo-700">ID</th>
									<th className="px-6 py-3 text-green-700">Name</th>
									<th className="px-6 py-3 text-blue-700">Email</th>
									<th className="px-6 py-3 text-purple-700">Phone</th>
									<th className="px-6 py-3 text-center text-red-700">Actions</th>
								</tr>
							</thead>
							<tbody>
								{filteredCustomers.map((item) => (
									<tr key={item.id} className="even:bg-white odd:bg-gray-50 hover:bg-yellow-50 transition-colors border-b">
										<td className="px-6 py-4 text-indigo-800 font-bold">{item.id}</td>
										<td className="px-6 py-4 text-green-800 font-semibold">{item.name}</td>
										<td className="px-6 py-4 text-blue-800">{item.email}</td>
										<td className="px-6 py-4 text-purple-800">{item.phone}</td>
										<td className="px-6 py-4 flex gap-2 justify-center">
											<Link href={`/customers/${item.id}`}>
												<button className="px-3 py-1 bg-blue-500 text-white rounded-lg font-bold text-sm hover:bg-blue-600 transition">View</button>
											</Link>
											<button 
												onClick={() => handleDelete(item.id)}
												className="px-3 py-1 bg-red-500 text-white rounded-lg font-bold text-sm hover:bg-red-600 transition"
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
			</div>
		</div>
	);
}

export default CustomerList;