import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import useStateRef from "react-usestateref";

import toastr from "toastr";
import "toastr/build/toastr.css";
import { useDispatch, useSelector } from "react-redux";

import { isAuthenticated } from "../../../../auth/helpers";
import { API_URL } from "../../../../config";
import { getFournisseurs } from "../../../../actions/getFournisseur";

function AddEditFournisseurModal({ id, show, handleClose }) {
  const [isvalid, setIsValid, ref] = useStateRef(true);
  const [nFournisseur, setFournisseur] = useState({
    NomFournisseur: "",
  });
  const dispatch = useDispatch();
  const fournisseur = useSelector((state) =>
    id ? state.fournisseurReducer.find((p) => p.idFournisseur === id) : null
  );
  useEffect(() => {
    if (fournisseur) {
      setFournisseur(fournisseur);
    } else {
      setFournisseur({});
    }
  }, [fournisseur]);
  const [errors, setErrors] = useState({});
  const validate = () => {
    if (!nFournisseur.NomFournisseur) {
      setErrors({ Libelle: "Veuilez Entrer le nom du fournisseur " });
      setIsValid(false);
    } else {
      setIsValid(true);
      setErrors({});
    }
    return ref.current;
  };
  const AddFournisseur = () => {
    const { user, token } = isAuthenticated();
    fetch(`${API_URL}/fournisseurs/create/${user.Mle}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(nFournisseur),
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
            `Le Fournisseur ${nFournisseur.NomFournisseur}  est crée avec succés `,
            "Nouveau Service",
            {
              positionClass: "toast-bottom-left",
            }
          );
          setFournisseur({ NomFournisseur: "" });
          dispatch(getFournisseurs());
          handleClose();
        }
      })
      .catch((err) => {
        toastr.error(err, "Erreur du serveur", {
          positionClass: "toast-bottom-left",
        });
      });
  };
  const updateFournisseur = () => {
    const { user, token } = isAuthenticated();
    fetch(`${API_URL}/fournisseurs/update/${user.Mle}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(nFournisseur),
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
          dispatch(getFournisseurs());
          //props.history.push('/');
          toastr.success(
            `Le fournisseur ${nFournisseur.NomFournisseur}  est modifié avec succés `,
            "Modification Service",
            {
              positionClass: "toast-bottom-left",
            }
          );
          setFournisseur({ NomFournisseur: "" });

          handleClose();
        }
      })
      .catch((err) => {
        toastr.error(err, "Erreur du serveur", {
          positionClass: "toast-bottom-left",
        });
      });
  };
  const Submit = (e) => {
    e.preventDefault();
    if (validate()) {
      if (!id) {
        AddFournisseur();
      } else {
        updateFournisseur();
      }
    }
  };
  const handleChange = (e) => {
    setFournisseur({ ...nFournisseur, [e.target.id]: e.target.value });
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {fournisseur
              ? `Modification  du Fournisseur : ${fournisseur.NomFournisseur} `
              : "Ajout Fournisseur"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Nom Fournisseur: </Form.Label>
            <Form.Control
              value={nFournisseur.NomFournisseur || ""}
              onChange={handleChange}
              type="text"
              placeholder="Nom Fournisseur"
              id="NomFournisseur"
            />
            <div className="text-danger">{errors.Libelle}</div>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={Submit}>
            {id !== undefined ? "Modifier" : "Ajout"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddEditFournisseurModal;
