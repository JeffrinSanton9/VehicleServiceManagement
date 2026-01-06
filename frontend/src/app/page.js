import Link from "next/link";

export default function Home() {
  return(
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-pink-100 to-yellow-100">
      <div className="flex flex-col items-center gap-10">
        <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 drop-shadow-lg text-center tracking-tight">
          Vehicle Service Management
        </h1>
        <p className="text-2xl text-gray-700 text-center max-w-2xl">
          Manage your vehicle services, bookings, and customer information all in one place
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Link href="/dashboard">
            <div className="bg-white/90 p-8 rounded-3xl shadow-2xl hover:scale-105 transition-transform cursor-pointer border-4 border-indigo-300 text-center">
              <h2 className="text-3xl font-black text-indigo-700 mb-3">📊 Dashboard</h2>
              <p className="text-gray-600">View statistics and overview</p>
            </div>
          </Link>
          
          <Link href="/customers">
            <div className="bg-white/90 p-8 rounded-3xl shadow-2xl hover:scale-105 transition-transform cursor-pointer border-4 border-green-300 text-center">
              <h2 className="text-3xl font-black text-green-700 mb-3">👥 Customers</h2>
              <p className="text-gray-600">Manage customer records</p>
            </div>
          </Link>
          
          <Link href="/vehicles">
            <div className="bg-white/90 p-8 rounded-3xl shadow-2xl hover:scale-105 transition-transform cursor-pointer border-4 border-blue-300 text-center">
              <h2 className="text-3xl font-black text-blue-700 mb-3">🚗 Vehicles</h2>
              <p className="text-gray-600">Track vehicle inventory</p>
            </div>
          </Link>
          
          <Link href="/bookings">
            <div className="bg-white/90 p-8 rounded-3xl shadow-2xl hover:scale-105 transition-transform cursor-pointer border-4 border-purple-300 text-center">
              <h2 className="text-3xl font-black text-purple-700 mb-3">📅 Bookings</h2>
              <p className="text-gray-600">Schedule services</p>
            </div>
          </Link>
          
          <Link href="/reports">
            <div className="bg-white/90 p-8 rounded-3xl shadow-2xl hover:scale-105 transition-transform cursor-pointer border-4 border-yellow-300 text-center">
              <h2 className="text-3xl font-black text-yellow-700 mb-3">📈 Reports</h2>
              <p className="text-gray-600">Search and analyze data</p>
            </div>
          </Link>
          
          <Link href="/about">
            <div className="bg-white/90 p-8 rounded-3xl shadow-2xl hover:scale-105 transition-transform cursor-pointer border-4 border-red-300 text-center">
              <h2 className="text-3xl font-black text-red-700 mb-3">ℹ️ About</h2>
              <p className="text-gray-600">Learn more about us</p>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}

