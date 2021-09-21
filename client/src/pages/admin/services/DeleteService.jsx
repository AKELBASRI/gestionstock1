import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

import toastr from "toastr";
import "toastr/build/toastr.css";
import { isAuthenticated } from "../../../auth/helpers";
import customAxios from "../../../axios/CustomAxios";

const handleClickDelete = (service, actiongetservices) => {
  const { user } = isAuthenticated();
  customAxios
    .delete(`/service/deleteservice/${user.Mle}`, {
      data: {
        id: service.id,
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
            `Le service ${service.service_name}  est supprimé avec succés `,
            "Suppression Service",
            {
              positionClass: "toast-bottom-left",
            }
          );
          actiongetservices();
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
