import Link from "next/link";
import Navigation from "../components/Navigation";

export default function Customers(){
	return (
		<main className="min-h-screen bg-gradient-to-br from-blue-100 via-pink-100 to-yellow-100">
			<Navigation />
			<div className="flex items-center justify-center min-h-[80vh] gap-8">
				<div className="flex flex-col gap-6">
					<h1 className="text-5xl font-black bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-500 text-transparent bg-clip-text text-center tracking-tight uppercase">Customer Management</h1>
					
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<Link href="/customers/list">
							<div className="bg-white/90 p-10 rounded-3xl shadow-2xl hover:scale-105 transition-transform cursor-pointer border-4 border-indigo-300 text-center">
								<h2 className="text-3xl font-black text-indigo-700 mb-4">View Customers</h2>
								<p className="text-gray-600 text-lg">Browse and manage all customers</p>
							</div>
						</Link>
						
						<Link href="/customers/add">
							<div className="bg-white/90 p-10 rounded-3xl shadow-2xl hover:scale-105 transition-transform cursor-pointer border-4 border-green-300 text-center">
								<h2 className="text-3xl font-black text-green-700 mb-4">Add Customer</h2>
								<p className="text-gray-600 text-lg">Register a new customer</p>
							</div>
						</Link>
					</div>
				</div>
			</div>
		</main>
	)
}