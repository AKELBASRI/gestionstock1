import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

import toastr from "toastr";
import "toastr/build/toastr.css";
import { isAuthenticated } from "../../../../auth/helpers";
import customAxios from "../../../../axios/CustomAxios";

const hadleClickDelelte = (lieu, ActiongetLieux) => {
  const { user } = isAuthenticated();
  customAxios
    .delete(`lieux/delete/${user.Mle}`, {
      data: {
        id: lieu.id,
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
            `Le lieu  ${lieu.lieu}  est supprimé avec succés `,
            "Suppression Agent",
            {
              positionClass: "toast-bottom-left",
            }
          );
          ActiongetLieux();
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

export default hadleClickDelelte;
