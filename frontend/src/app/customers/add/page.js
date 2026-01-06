

"use client"

import { useState } from "react"

export default function AddCustomer(){
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [phone, setPhoneNumber] = useState("")
	const [address, setAddress] = useState("")
	const [loading, setLoading] = useState(false)
	const [success, setSuccess] = useState(false)
	const [error, setError] = useState("")

	async function handleSubmit(e){
		e.preventDefault();
		setLoading(true);
		setSuccess(false);
		setError("");
		try {
			const res = await fetch("http://127.0.0.1:8000/customers/", {
				method : 'POST',
				headers : {
					'Content-Type' : 'application/json',
				},
				body : JSON.stringify({name, email, phone : phone, address})
			});
			if (res.ok) {
				setSuccess(true);
				setName(""); setEmail(""); setPhoneNumber(""); setAddress("");
				setTimeout(() => {
					window.location.href = "/customers/list";
				}, 2000);
			}
		}
		catch (err) {
			setError("Network error. Please try again.");
		}
		setLoading(false);
	}

	return(
		<main className="flex items-center justify-center min-h-screen">
			<form onSubmit={handleSubmit} className="bg-white/90 dark:bg-slate-800/80 p-10 rounded-3xl shadow-2xl w-full max-w-2xl flex flex-col gap-10 backdrop-blur">
				<h2 className="text-5xl font-black text-indigo-700 dark:text-yellow-300 text-center mb-4 tracking-wider uppercase drop-shadow-lg">Add Customer</h2>
				{success && <div className="text-green-600 font-bold text-center text-2xl">Customer added successfully!</div>}
				{error && <div className="text-red-600 font-bold text-center text-2xl">{error}</div>}
				<div className="grid grid-cols-1 gap-8 w-full">
					<div className="flex flex-col gap-3 w-full">
						<label className="font-bold text-indigo-700 text-2xl" htmlFor="name">Name</label>
						<input 
							type="text"
							id="name"
							placeholder="Enter Name"
							value={name}
							onChange={(e) => (setName(e.target.value))}
							className="w-full px-8 py-5 rounded-2xl border-2 border-indigo-200 focus:ring-2 focus:ring-indigo-400 focus:outline-none bg-gray-50 text-2xl font-fira font-bold placeholder-gray-400 transition"
							required
						/>
					</div>
					<div className="flex flex-col gap-3 w-full">
						<label className="font-bold text-indigo-700 text-2xl" htmlFor="email">Email</label>
						<input
							type="email"
							id="email"
							placeholder="Enter e-mail"
							value={email}
							onChange={(e) => (setEmail(e.target.value))}
							className="w-full px-8 py-5 rounded-2xl border-2 border-indigo-200 focus:ring-2 focus:ring-indigo-400 focus:outline-none bg-gray-50 text-2xl font-fira font-bold placeholder-gray-400 transition"
							required
						/>
					</div>
					<div className="flex flex-col gap-3 w-full">
						<label className="font-bold text-indigo-700 text-2xl" htmlFor="phone">Phone</label>
						<input
							type="tel"
							id="phone"
							placeholder="Enter phone number"
							value={phone}
							onChange={(e) => (setPhoneNumber(e.target.value))}
							className="w-full px-8 py-5 rounded-2xl border-2 border-indigo-200 focus:ring-2 focus:ring-indigo-400 focus:outline-none bg-gray-50 text-2xl font-fira font-bold placeholder-gray-400 transition"
							required
						/>
					</div>
					<div className="flex flex-col gap-3 w-full mb-12">
						<label className="font-bold text-indigo-700 text-2xl" htmlFor="address">Address</label>
						<textarea
							id="address"
							placeholder="Enter address"
							value={address}
							onChange={(e) => (setAddress(e.target.value))}
							className="w-full px-8 py-5 rounded-2xl border-2 border-indigo-200 focus:ring-2 focus:ring-indigo-400 focus:outline-none bg-gray-50 text-2xl font-fira font-bold placeholder-gray-400 transition resize-none"
							rows={4}
							required
						/>
					</div>
				</div>
				<button type="submit" disabled={loading} className="self-center mt-8 px-8 py-3 rounded-full bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-500 text-white font-black shadow-xl hover:scale-105 transition-transform text-xl tracking-wider uppercase disabled:opacity-60 disabled:cursor-not-allowed">
					{loading ? "Adding..." : "Add Customer"}
				</button>
			</form>
		</main>
	)
}
