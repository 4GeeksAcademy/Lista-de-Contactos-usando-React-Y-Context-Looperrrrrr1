export const initialStore = () => {
  return {
    contacts: [],
    mySlug: "Looper_Alam"
  }
}


export default function storeReducer(store, action = {}) {
  switch(action.type){
    
  
    case 'load_contacts':
      return {
        ...store, 
        contacts: action.payload
      };

      case 'delete_contact':
      const newContacts = store.contacts.filter(item => item.id !== action.payload);
      return {
        ...store,
        contacts: newContacts
      };

      case 'update_contact':
      const updatedContacts = store.contacts.map(item => {
          if (item.id === action.payload.id) {
              return action.payload;
          }
          return item;
      });
      return { ...store, contacts: updatedContacts };

    default:
      throw Error('Acción desconocida (Unknown action).');
  }    
}