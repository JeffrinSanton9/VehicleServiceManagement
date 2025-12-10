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
		<>
			<div>
				<p>Number of Total Customers : {customerJson.length} </p>
				<p>Number of Pending Customers : {pendingJson.length}</p>
			</div>
		</>
	);
}