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
export const DeleteMessageBox = () => {
  return new Promise(function (resolve) {
    confirmAlert({
      closeOnClickOutside: false,
      customUI: function showdialog({ onClose }) {
        return (
          <div className="custom-ui">
            <h1>Vous êtes sure ?</h1>
            <p>
              Voulez-vous Vraiment supprimer le(s) element(s) selectionné(s) ?
            </p>
            <button
              onClick={() => {
                resolve(false);
                onClose();
              }}
            >
              Non
            </button>
            <button
              onClick={() => {
                resolve(true);
                onClose();
              }}
            >
              Oui, Supprimer !
            </button>
          </div>
        );
      },
    });
  });
};
export const CustomSearchIgnoreAccent = (searchQuery, currentRow) => {
  let isFound = false;
  let stringSearch = searchQuery
    .toLowerCase()
    ?.normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  currentRow?.forEach((col) => {
    if (
      col
        ?.toString()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .indexOf(stringSearch) >= 0
    ) {
      isFound = true;
    }
  });
  return isFound;
};
export const RequestError = () => (
  <p>There was some error during fetching. Please try again.</p>
);

// export const replaceAll = (str) => {
//   let mapObj = {
//     service_name: "title",
//     id: "value",
//   };
//   var re = new RegExp(Object.keys(mapObj).join("|"), "g");

//   return JSON.parse(
//     str.replace(re, function (matched) {
//       return mapObj[matched.toLowerCase()];
//     })
//   );
// };

const affectvalueandtitle = (children) => {
  if (children?.length >= 0) {
    return children.map((service) => ({
      value: service.id,
      title: service.service_name,
      children: affectvalueandtitle(service.children),
    }));
  } else {
    return false;
  }
};

export const replaceAll = (str) => {
  return str?.map((service) => ({
    value: service.id,
    title: service.service_name,
    children: affectvalueandtitle(service.children),
  }));
};
