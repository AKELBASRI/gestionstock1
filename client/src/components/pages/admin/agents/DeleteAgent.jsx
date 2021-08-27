import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

import toastr from "toastr";
import "toastr/build/toastr.css";
import { isAuthenticated } from "../../../../auth/helpers";
import customAxios from "../../../../axios/CustomAxios";

const handleClickDelete = (agent, Actiongetagents) => {
  const { user } = isAuthenticated();
  customAxios
    .delete(`/agents/delete/${user.Mle}`, {
      data: {
        agent_number: agent.agent_number,
      },
    })
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
            `L'agent ${agent.agent_full_name}  est supprimé avec succés `,
            "Suppression Agent",
            {
              positionClass: "toast-bottom-left",
            }
          );
          Actiongetagents();
        }
      }
    })
    .catch((err) => {
      toastr.error(err.response.data.error, "Erreur du serveur", {
        positionClass: "toast-bottom-left",
      });
    });

  return null;
};

export default handleClickDelete;
