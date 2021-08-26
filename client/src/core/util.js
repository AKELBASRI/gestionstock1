import { confirmAlert } from "react-confirm-alert";

export const Delete = (user, action, handleClickDelete) => {
  confirmAlert({
    customUI: function showdialog({ onClose }) {
      return (
        <div className="custom-ui">
          <h1>Vous êtes sure ?</h1>
          <p>Voulez-vous Vraiment supprimer ?</p>
          <button onClick={onClose}>Non</button>
          <button
            onClick={() => {
              handleClickDelete(user, action);

              onClose();
            }}
          >
            Oui, Supprimer !
          </button>
        </div>
      );
    },
  });
};



export const RequestError = () => (
  <p>There was some error during fetching. Please try again.</p>
);