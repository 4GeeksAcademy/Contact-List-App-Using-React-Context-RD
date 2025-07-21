import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const Addcontact = () => {
	const navigate = useNavigate();
	const { id } = useParams();

	const [formData, setFormData] = useState({
		name: "",
		phone: "",
		email: "",
		address: ""
	});

	// Load contact if in edit mode

useEffect(() => {
	if (id) {
		fetch(`https://playground.4geeks.com/contact/agendas/rudy/contacts`)
			.then(res => res.json())
			.then(data => {
				const contact = data.contacts.find(c => c.id === parseInt(id));
				if (contact) {
					setFormData({
						name: contact.name,
						phone: contact.phone,
						email: contact.email,
						address: contact.address,
					});
				} 
			})
			.catch(err => console.error("Error loading contact:", err));
	}
}, [id]);



	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const url = id
		? `https://playground.4geeks.com/contact/agendas/rudy/contacts/${id}`
		: `https://playground.4geeks.com/contact/agendas/rudy/contacts`;

		const method = id ? "PUT" : "POST";

		try {
			const response = await fetch(url, {
				method,
				headers: {
					"Content-Type": "application/json",
					accept: "application/json"
				},
				body: JSON.stringify(formData)
			});

			if (response.ok) {
				navigate("/");
			} else {
				console.error("Failed to save contact");
			}
		} catch (err) {
			console.error("Error saving contact:", err);
		}
	};

	return (
		<div className="container mt-5" style={{ maxWidth: "600px" }}>
			<h2 className="mb-4 text-center">{id ? "Edit Contact" : "Add New Contact"}</h2>

			<form onSubmit={handleSubmit}>
				{["name", "phone", "email", "address"].map((field) => (
					<div className="mb-3" key={field}>
						<label className="form-label">{field[0].toUpperCase() + field.slice(1)}</label>
						<input
							type="text"
							className="form-control"
							name={field}
							value={formData[field]}
							onChange={handleChange}
							required={field === "name"}
						/>
					</div>
				))}

				<div className="d-grid">
					<button type="submit" className="btn btn-primary">
						{id ? "Update Contact" : "Save Contact"}
					</button>
				</div>
			</form>
		</div>
	);
};

