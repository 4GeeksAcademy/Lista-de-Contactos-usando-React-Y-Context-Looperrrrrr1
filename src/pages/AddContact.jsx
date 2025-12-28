import React, { useState, useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link, useNavigate, useParams } from "react-router-dom";

export const AddContact = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();
    const { id } = useParams();

    const [contact, setContact] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    useEffect(() => {
        if (id && store.contacts.length > 0) {
            const currentContact = store.contacts.find(c => c.id == id);
            if (currentContact) {
                setContact({
                    name: currentContact.name,
                    email: currentContact.email,
                    phone: currentContact.phone,
                    address: currentContact.address
                });
            }
        }
    }, [id, store.contacts]);

    const handleChange = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        
        let url = "https://playground.4geeks.com/contact/agendas/" + store.mySlug + "/contacts";
        let method = "POST";

        if (id) {
            url = url + "/" + id;
        }

        fetch(url, {
            method: method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(contact)
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Error al guardar");
        })
        .then(data => {
            alert("¡Éxito!");
            
            if (id) {
                dispatch({
                    type: "update_contact",
                    payload: data
                });
            }
            
            navigate("/");
        })
        .catch(error => alert("Hubo un error: " + error));
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">{id ? "Editar Contacto" : "Añadir nuevo contacto"}</h1>
            
            <form>
                <div className="mb-3">
                    <label className="form-label">Nombre completo</label>
                    <input type="text" className="form-control" name="name" 
                        onChange={handleChange} value={contact.name} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" 
                        onChange={handleChange} value={contact.email} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Teléfono</label>
                    <input type="text" className="form-control" name="phone" 
                        onChange={handleChange} value={contact.phone} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Dirección</label>
                    <input type="text" className="form-control" name="address" 
                        onChange={handleChange} value={contact.address} />
                </div>

                <button type="button" className="btn btn-primary w-100" onClick={handleSave}>
                    {id ? "Actualizar" : "Guardar"}
                </button>
                
                <Link to="/" className="d-block mt-3 text-center">
                    Volver a los contactos
                </Link>
            </form>
        </div>
    );
};