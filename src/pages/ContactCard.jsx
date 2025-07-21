import React from "react";
import { useNavigate } from "react-router-dom";

const ContactCard = ({ contact, onDelete }) => {
	const navigate = useNavigate();

	return (
		<div className="container border p-3 my-3 position-relative" style={{ borderRadius: "6px" }}>
			<div className="position-absolute top-0 end-0 mt-2 me-2">
				<button
					className="btn btn-sm"
					onClick={() => onDelete(contact.id)}
				>
					<i className="fa-solid fa-trash"></i>
				</button>
				<button
					className="btn btn-sm"
					onClick={() => navigate(`/edit/${contact.id}`)}
				>
					<i className="fa-solid fa-pencil"></i>
				</button>
			</div>

			<div className="d-flex align-items-center gap-3">
				<img
					src="https://cdn.pfps.gg/pfps/1884-cool-anime.png"
					alt="Contact"
					className="rounded-circle"
					style={{ width: "150px", height: "150px", objectFit: "cover" }}
				/>

				<div className="text-start">
					<h4>{contact.name}</h4>
					<p><strong><i className="fa-solid fa-location-dot me-2"></i>Address:</strong> {contact.address}</p>
					<p><strong><i className="fa-solid fa-phone-flip me-2"></i>Phone:</strong> {contact.phone}</p>
					<p><strong><i className="fa-solid fa-envelope me-2"></i>Email:</strong> {contact.email}</p>
				</div>
			</div>
		</div>
	);
};

export default ContactCard;

