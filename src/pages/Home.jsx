import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";

export const Home = () => {

  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    fetch("https://playground.4geeks.com/contact/agendas/" + store.mySlug + "/contacts")
      .then(response => {
        if (response.status === 404) {
          createAgenda();
          return null;
        }
        return response.json();
      })
      .then(data => {
        if (data) {
          dispatch({
            type: "load_contacts",
            payload: data.contacts
          });
        }
      })
      .catch(error => console.log("Error cargando contactos:", error));

  }, []);

  const createAgenda = () => {
    fetch("https://playground.4geeks.com/contact/agendas/" + store.mySlug, {
      method: "POST",
    })
      .then(response => {
        if (response.ok) console.log("Agenda creada!");
      });
  }

  const handleDelete = (id) => {
    fetch("https://playground.4geeks.com/contact/agendas/" + store.mySlug + "/contacts/" + id, {
      method: "DELETE"
    })
      .then(response => {
        if (response.ok) {
          dispatch({
            type: "delete_contact",
            payload: id
          });
        } else {
          console.log("Error al borrar");
        }
      });
  };

  return (
    <div className="container mt-5">
      <h1>Mi Lista de Contactos</h1>

      <Link to="/add">
        <button className="btn btn-success mb-3">Añadir nuevo contacto</button>
      </Link>

      <ul className="list-group">
        {store.contacts.map((contact, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">

            <div>
              <h5 className="mb-1">{contact.name}</h5>
              <p className="mb-0 text-muted">📞 {contact.phone}</p>
              <small className="text-muted">✉️ {contact.email}</small>
            </div>

            <div>
              <Link to={"/edit/" + contact.id} className="btn btn-sm btn-outline-primary me-2">
                ✏️
              </Link>

              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => handleDelete(contact.id)}
              >
                🗑️
              </button>
            </div>

          </li>
        ))}
      </ul>

      {store.contacts.length === 0 && (
        <p className="text-muted">No hay contactos todavía... ¡Añade tu primer contacto!</p>
      )}
    </div>
  );
};