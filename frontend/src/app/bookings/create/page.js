"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

/* -------------------- Date Helpers -------------------- */
function todayDate() {
	return new Date().toISOString().split("T")[0];
}

function formatDateToISO(dateStr) {
	if (!dateStr) return null;
	return new Date(dateStr + "T00:00:00").toISOString();
}

/* -------------------- Component -------------------- */
export default function CreateBooking() {
	const [vehicles, setVehicles] = useState([]);
	const [selectedVehicle, setSelectedVehicle] = useState("");
	const [serviceType, setServiceType] = useState("Routine");

	const [bookingDate, setBookingDate] = useState(todayDate());
	const [scheduledDate, setScheduledDate] = useState("");

	const [estimatedCost, setEstimatedCost] = useState("");
	const [customerNotes, setCustomerNotes] = useState("");

	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState("");

	/* -------------------- Load Vehicles -------------------- */
	useEffect(() => {
		async function loadVehicles() {
			try {
				const res = await fetch("http://127.0.0.1:8000/vehicles/", {
					cache: "no-store",
				});
				const data = await res.json();
				setVehicles(data);
			} catch (err) {
				console.error("Error loading vehicles:", err);
			}
		}
		loadVehicles();
	}, []);

	/* -------------------- Submit Handler -------------------- */
	async function handleSubmit(e) {
		e.preventDefault();
		setLoading(true);
		setSuccess(false);
		setError("");

		if (!selectedVehicle) {
			setError("Please select a vehicle");
			setLoading(false);
			return;
		}

		if (!bookingDate || !scheduledDate) {
			setError("Please select both booking and scheduled dates");
			setLoading(false);
			return;
		}

		if (new Date(scheduledDate) < new Date(bookingDate)) {
			setError("Scheduled date cannot be earlier than booking date");
			setLoading(false);
			return;
		}

		try {
			const res = await fetch("http://127.0.0.1:8000/booking/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					vehicle_id: Number(selectedVehicle),
					service_type: serviceType.toLowerCase(),
					booking_date: formatDateToISO(bookingDate),
					scheduled_date: formatDateToISO(scheduledDate),
					estimated_cost: estimatedCost ? Number(estimatedCost) : null,
					customer_notes: customerNotes || null,
					status: "pending",
				}),
			});

			if (!res.ok) {
				throw new Error("Failed to create booking");
			}

			setSuccess(true);
			setSelectedVehicle("");
			setServiceType("Routine");
			setBookingDate(todayDate());
			setScheduledDate("");
			setEstimatedCost("");
			setCustomerNotes("");
		} catch (err) {
			console.error(err);
			setError("Something went wrong. Please try again.");
		} finally {
			setLoading(false);
		}
	}

	/* -------------------- UI -------------------- */
	return (
		<main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-pink-100 to-yellow-100 py-10">
			<div className="bg-white/90 dark:bg-slate-800/80 p-10 rounded-3xl shadow-2xl w-full max-w-2xl flex flex-col gap-8 backdrop-blur border-4 border-indigo-300">

				<h2 className="text-5xl font-black text-indigo-700 dark:text-yellow-300 text-center tracking-wider uppercase">
					Create Booking
				</h2>

				{success && (
					<div className="text-green-700 bg-green-100 p-4 rounded-lg font-bold text-center">
						Booking created successfully!
					</div>
				)}

				{error && (
					<div className="text-red-700 bg-red-100 p-4 rounded-lg font-bold text-center">
						{error}
					</div>
				)}

				<form onSubmit={handleSubmit} className="flex flex-col gap-6">

					{/* Vehicle */}
					<div className="flex flex-col gap-2">
						<label className="font-bold text-indigo-700">Select Vehicle</label>
						<select
							value={selectedVehicle}
							onChange={(e) => setSelectedVehicle(e.target.value)}
							required
							className="px-5 py-3 rounded-xl border-2 border-indigo-200 bg-gray-50 font-semibold"
						>
							<option value="">-- Select Vehicle --</option>
							{vehicles.map((v) => (
								<option key={v.id} value={v.id}>
									{v.make} {v.model} ({v.year}) - {v.license_plate}
								</option>
							))}
						</select>
					</div>

					{/* Service Type */}
					<div className="flex flex-col gap-2">
						<label className="font-bold text-indigo-700">Service Type</label>
						<select
							value={serviceType}
							onChange={(e) => setServiceType(e.target.value)}
							className="px-5 py-3 rounded-xl border-2 border-indigo-200 bg-gray-50 font-semibold"
						>
							<option>Routine</option>
							<option>Repair</option>
							<option>Accident</option>
							<option>Custom</option>
						</select>
					</div>

					{/* Dates */}
					<div className="grid grid-cols-2 gap-4">
						<div className="flex flex-col gap-2">
							<label className="font-bold text-indigo-700">Booking Date</label>
							<input
								type="date"
								value={bookingDate}
								max={todayDate()}
								onChange={(e) => setBookingDate(e.target.value)}
								required
								className="px-5 py-3 rounded-xl border-2 border-indigo-200 bg-gray-50 font-semibold"
							/>
						</div>

						<div className="flex flex-col gap-2">
							<label className="font-bold text-indigo-700">Scheduled Date</label>
							<input
								type="date"
								value={scheduledDate}
								min={bookingDate}
								onChange={(e) => setScheduledDate(e.target.value)}
								required
								className="px-5 py-3 rounded-xl border-2 border-indigo-200 bg-gray-50 font-semibold"
							/>
						</div>
					</div>

					{/* Estimated Cost */}
					<div className="flex flex-col gap-2">
						<label className="font-bold text-indigo-700">Estimated Cost (Optional)</label>
						<input
							type="number"
							step="0.01"
							value={estimatedCost}
							onChange={(e) => setEstimatedCost(e.target.value)}
							className="px-5 py-3 rounded-xl border-2 border-indigo-200 bg-gray-50 font-semibold"
						/>
					</div>

					{/* Notes */}
					<div className="flex flex-col gap-2">
						<label className="font-bold text-indigo-700">Customer Notes</label>
						<textarea
							value={customerNotes}
							onChange={(e) => setCustomerNotes(e.target.value)}
							rows={4}
							className="px-5 py-3 rounded-xl border-2 border-indigo-200 bg-gray-50 font-semibold resize-none"
						/>
					</div>

					<button
						type="submit"
						disabled={loading}
						className="mt-4 self-center px-10 py-3 rounded-full bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-500 text-white font-black tracking-wider uppercase disabled:opacity-60"
					>
						{loading ? "Creating..." : "Create Booking"}
					</button>
				</form>

				<Link href="/bookings/list">
					<p className="text-center text-indigo-600 font-bold underline hover:text-indigo-800">
						View Bookings
					</p>
				</Link>
			</div>
		</main>
	);
}