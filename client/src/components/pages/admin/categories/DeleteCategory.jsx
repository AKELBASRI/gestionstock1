import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

import toastr from "toastr";
import "toastr/build/toastr.css";
import { isAuthenticated } from "../../../../auth/helpers";
import customAxios from "../../../../axios/CustomAxios";

const handleClickDelete = (category, Actiongetcategories) => {
  const { user } = isAuthenticated();
  customAxios
    .delete(`category/deletecategory/${user.Mle}`, {
      data: {
        id: category.id,
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
            `La category type ${category.type}  est supprimé avec succés `,
            "Suppression Agent",
            {
              positionClass: "toast-bottom-left",
            }
          );
          Actiongetcategories();
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
