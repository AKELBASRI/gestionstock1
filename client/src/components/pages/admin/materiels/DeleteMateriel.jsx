import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

import toastr from "toastr";
import "toastr/build/toastr.css";
import { isAuthenticated } from "../../../../auth/helpers";
import customAxios from "../../../../axios/CustomAxios";

const handleClickDelete = (materiel, ActiongetMateriel) => {
  const marque = materiel.designation.designation;
  const { user } = isAuthenticated();
  customAxios
    .delete(`/materiels/delete/${user.Mle}`, {
      data: {
        idmateriel: materiel.idmateriel,
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
            `Le materiel ${marque}  est supprimé avec succés `,
            "Suppression Materiel",
            {
              positionClass: "toast-bottom-left",
            }
          );
          ActiongetMateriel();
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
