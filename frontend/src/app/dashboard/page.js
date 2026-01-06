import Link from "next/link";
import Navigation from "../components/Navigation";
export default async function DashBoard(){
	const customers = await fetch("http://127.0.0.1:8000/customers/", {
		cache : "no-store"
	});
	const pending = await fetch("http://127.0.0.1:8000/booking/status/Pending", {
		cache : "no-store"
	});

	if(!customers.ok){
		throw new Error("Failed to fetch");
	}

	const customerJson = await customers.json();
	const pendingJson = await pending.json(); 
	return(
		<main className="min-h-screen bg-gradient-to-br from-blue-100 via-pink-100 to-yellow-100 py-10 px-4 font-fira">
			<div className="ml-56 flex flex-col items-center justify-center min-h-[80vh] w-full">
				<h1 className="text-6xl font-extrabold text-indigo-900 mb-12 text-center tracking-tight uppercase drop-shadow-lg">Dashboard</h1>
				<div className="w-full max-w-3xl bg-white/95 dark:bg-slate-900/95 rounded-3xl shadow-2xl border-4 border-indigo-300 dark:border-indigo-700 p-10 flex flex-col gap-10 items-center">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
						<div className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-gradient-to-br from-green-100 to-green-200 border-2 border-green-300 shadow">
							<span className="text-5xl font-black text-green-700">{customerJson.length}</span>
							<p className="text-xl font-bold text-green-900 tracking-wide">Total Customers</p>
						</div>
						<div className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-gradient-to-br from-yellow-100 to-yellow-200 border-2 border-yellow-300 shadow">
							<span className="text-5xl font-black text-yellow-700">{pendingJson.length}</span>
							<p className="text-xl font-bold text-yellow-900 tracking-wide">Pending Bookings</p>
						</div>
					</div>
					<Link href="/bookings/create" className="w-full flex justify-center">
						<button className="mt-8 px-10 py-4 rounded-full bg-indigo-700 text-white font-black shadow-xl hover:bg-indigo-800 transition text-2xl tracking-wider uppercase">Create Booking</button>
					</Link>
				</div>
			</div>
		</main>
	);
}