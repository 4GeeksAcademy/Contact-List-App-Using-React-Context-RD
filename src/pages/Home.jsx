import React, { useState, useEffect } from "react";
import ContactCard from "./ContactCard.jsx";

export const Home = () => {
	const [contacts, setContacts] = useState([]);

	useEffect(() => {
		fetch("https://playground.4geeks.com/contact/agendas/rudy/contacts")
			.then(res => res.json())
			.then(data => setContacts(data.contacts))
			.catch(err => console.error("Error loading contacts:", err));
	}, []);

	const handleDelete = (id) => {
		fetch(`https://playground.4geeks.com/contact/agendas/rudy/contacts/${id}`, {
			method: "DELETE",
			headers: {
				accept: "application/json"
			}
		})
			.then((res) => {
				if (res.status === 204) {
					setContacts(prev => prev.filter(contact => contact.id !== id));
				} else {
					console.error("Failed to delete contact:", res.status);
				}
			})
			.catch((err) => {
				console.error("Error deleting contact:", err);
			});
	};

	return (
		<div className="container text-center mt-5">
			<div className="d-flex flex-wrap justify-content-center gap-3">
				{contacts.length > 0 ? (
					contacts.map(contact => (
						<ContactCard key={contact.id} contact={contact} onDelete={handleDelete} />


					))
				) : (
					<p>No contacts found...</p>
				)}
			</div>
		</div>
	);
};
