import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

import toastr from "toastr";
import "toastr/build/toastr.css";
import { isAuthenticated } from "../../../../auth/helpers";
import customAxios from "../../../../axios/CustomAxios";

const handleClickDeleteAdmin = (usernormal, action) => {
  const { user } = isAuthenticated();
  customAxios
    .delete(`/admin/delete/${user.Mle}`, {
      data: {
        Mle: usernormal.Mle,
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
        toastr.success(
          `L'utilisateur ${usernormal.nom}  est supprimé avec succés `,
          "Suppression Utilisateur",
          {
            positionClass: "toast-bottom-left",
          }
        );
        action();
      }
    })
    .catch((err) => {
      toastr.error(err.response.data.error, "Erreur du serveur", {
        positionClass: "toast-bottom-left",
      });
    });

  return null;
};

export default handleClickDeleteAdmin;
