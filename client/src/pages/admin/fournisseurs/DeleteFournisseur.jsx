import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

import toastr from "toastr";
import "toastr/build/toastr.css";
import { isAuthenticated } from "../../../auth/helpers";
import customAxios from "../../../axios/CustomAxios";

const handleClickDelete = (fournisseur, actiongetfournisseurs) => {
  const { user } = isAuthenticated();
  customAxios
    .delete(`/fournisseurs/delete/${user.Mle}`, {
      data: {
        idFournisseur: fournisseur.idFournisseur,
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
            `Le fournisseur ${fournisseur.NomFournisseur}  est supprimé avec succés `,
            "Suppression Service",
            {
              positionClass: "toast-bottom-left",
            }
          );
          actiongetfournisseurs();
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
