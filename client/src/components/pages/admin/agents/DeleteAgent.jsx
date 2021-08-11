import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

import toastr from "toastr";
import "toastr/build/toastr.css";
import { isAuthenticated } from "../../../../auth/helpers";
import { API_URL } from "../../../../config";

const handleClickDelete = (agent, Actiongetagents) => {
  const { user, token } = isAuthenticated();
  fetch(`${API_URL}/agents/delete/${user.Mle}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ agent_number: agent.agent_number }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.error) {
        toastr.warning(
          res.error,
          "S'il vous plaît Veuillez vérifier le Formulaire",
          {
            positionClass: "toast-bottom-left",
          }
        );
      } else {
        //props.history.push('/');
        toastr.success(
          `L'agent ${agent.nom}  est supprimé avec succés `,
          "Suppression Agent",
          {
            positionClass: "toast-bottom-left",
          }
        );
        Actiongetagents();
      }
    })
    .catch((err) => {
      toastr.error(err, "Erreur du serveur", {
        positionClass: "toast-bottom-left",
      });
    });
  return null;
};

export default handleClickDelete;
