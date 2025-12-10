"use client"
import { useEffect, useState } from "react";

function CustomerList(){
	const [customerListJson, setCustomerList] = useState([]);
	
	useEffect(() => {
		async function loadData(){
			try{
				const customerList = await fetch("http://127.0.0.1:8000/customers/", {
					cache : "no-store"
				});
				const data = await customerList.json();
				setCustomerList(data);
			}
			catch(error){
				console.error("fucked up", error);
			}
		}
		loadData();
	}, []);
	
	function handleNameSort(){
		const sorted = [...customerListJson].sort((a, b) => (
			a.name.localeCompare(b.name)
		));
		setCustomerList(sorted);
	}

	return (
		<div>
			<h1>Sort By : </h1>
			<br></br>
			<button onClick = {handleNameSort}>Name</button>
			<ul>
				{customerListJson.map((item) => (
					<li key={item.id}>
						ID : {item.id}<br></br>
						Name : {item.name}<br></br>
						Email : {item.email}<br></br>
						Phone : {item.phone}<br></br>
						Address : {item.address}<br></br><br></br>
					</li>
				))}
			</ul>
		</div>
	);
}
export default CustomerList;