import React, { useEffect } from "react"; 
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom"; 
import { ContactCard } from "../components/ContactCard";

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
     const confirmDelete = window.confirm("¿Estás seguro de que quieres borrar este contacto?");
     if (!confirmDelete) return; 

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
      <h1 className="text-center mb-4">Mi Lista de Contactos</h1>

      <div className="text-end mb-3">
          <Link to="/add">
            <button className="btn btn-success">Añadir nuevo contacto</button>
          </Link>
      </div>
      
      <ul className="list-group">
        {store.contacts.map((contact, index) => (
          <ContactCard 
            key={index} 
            contact={contact} 
            onDelete={handleDelete} 
          />
        ))}
      </ul>

      {store.contacts.length === 0 && (
        <div className="text-center mt-5 text-muted">
            <p>No tienes contactos... ¡Añade uno!</p>
        </div>
      )}
    </div>
  );
};