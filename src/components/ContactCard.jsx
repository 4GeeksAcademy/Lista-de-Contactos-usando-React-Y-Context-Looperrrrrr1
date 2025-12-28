import React from "react";
import { Link } from "react-router-dom";

export const ContactCard = ({ contact, onDelete }) => {
    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
                <img 
                    src="https://picsum.photos/200" 
                    alt="avatar" 
                    className="rounded-circle me-3" 
                    style={{ width: "50px", height: "50px", objectFit: "cover" }} 
                />
                <div>
                    <h5 className="mb-1">{contact.name}</h5>
                    <p className="mb-0 text-muted">📍 {contact.address}</p>
                    <p className="mb-0 text-muted">📞 {contact.phone}</p>
                    <small className="text-muted">✉️ {contact.email}</small>
                </div>
            </div>

            <div>
                <Link to={"/edit/" + contact.id} className="btn btn-sm btn-outline-primary me-2">
                    ✏️
                </Link>

                <button 
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => onDelete(contact.id)}
                >
                    🗑️
                </button>
            </div>
        </li>
    );
};