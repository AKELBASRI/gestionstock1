import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

import toastr from "toastr";
import "toastr/build/toastr.css";
import { isAuthenticated } from "../../../../auth/helpers";
import customAxios from "../../../../axios/CustomAxios";

export const EndOfInventory = (Props) => {
  const { ActionClose } = Props;
  const { user } = isAuthenticated();
  customAxios
    .post(`/materiels/createbackupMateriel/${user.Mle}`)
    .then((res) => {
      //props.history.push('/');
      toastr.success(res.data, "End Inventory", {
        positionClass: "toast-bottom-left",
      });
      console.log(typeof ActionClose);
    })
    .catch((err) => {
      toastr.error(err, "Erreur du serveur", {
        positionClass: "toast-bottom-left",
      });
    });

  return null;
};
