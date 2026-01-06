import About from "./about";
export default function best(){
	return (
		<div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-pink-100 to-yellow-100">
			<div className="bg-white/90 p-8 rounded-xl shadow-2xl w-full max-w-lg border border-gray-200">
				<About />
			</div>
		</div>
	);
}
