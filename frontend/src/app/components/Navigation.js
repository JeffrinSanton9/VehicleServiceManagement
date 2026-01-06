import Link from "next/link"
export default function Navigation(){
	return (
		<nav className="flex flex-row items-center gap-3 px-6 py-3 bg-gradient-to-r from-indigo-100 via-pink-100 to-yellow-100 w-full shadow-xl fixed left-0 top-0 z-50 border-b-2 border-indigo-200">
			<Link href={`/`}>
				<button className="py-2 px-4 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold shadow hover:scale-105 transition-transform">Home</button>
			</Link>
			<Link href={`/dashboard`}>
				<button className="py-2 px-4 rounded-lg bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 text-white font-semibold shadow hover:scale-105 transition-transform">Dashboard</button>
			</Link>
			<Link href={`/customers/`}>
				<button className="py-2 px-4 rounded-lg bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 text-white font-semibold shadow hover:scale-105 transition-transform">Customers</button>
			</Link>
			<Link href={`/vehicles`}>
				<button className="py-2 px-4 rounded-lg bg-gradient-to-r from-yellow-400 via-pink-400 to-red-400 text-white font-semibold shadow hover:scale-105 transition-transform">Vehicles</button>
			</Link>
			<Link href={`/bookings`}>
				<button className="py-2 px-4 rounded-lg bg-gradient-to-r from-pink-400 via-indigo-400 to-blue-400 text-white font-semibold shadow hover:scale-105 transition-transform">Bookings</button>
			</Link>
			<Link href={`/reports`}>
				<button className="py-2 px-4 rounded-lg bg-gradient-to-r from-indigo-400 via-green-400 to-yellow-400 text-white font-semibold shadow hover:scale-105 transition-transform">Reports</button>
			</Link>
		</nav>
	)
}