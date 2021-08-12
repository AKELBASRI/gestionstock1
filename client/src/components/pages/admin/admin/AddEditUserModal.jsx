import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import toastr from "toastr";
import "toastr/build/toastr.css";

import useStateRef from "react-usestateref";
import { API_URL } from "../../../../config";
import { isAuthenticated } from "../../../../auth/helpers";
import { getusers } from "../../../../actions/getUserAction";

function AddEditUserModal({ Mle, show, handleClose }) {
  const [, setIsValid, ref] = useStateRef(true);
  const [errors, setErrors] = useState({});

  const [normaluser, setUser] = useState({
    Mle: "",
    nom: "",
    password: "",
  });

  const dispatch = useDispatch();
  const usernormal = useSelector((state) =>
    Mle ? state.usersReducer.find((p) => p.Mle === Mle) : null
  );
  useEffect(() => {
    if (usernormal) {
      setUser(usernormal);
    } else {
      setUser({ Mle: "", nom: "", password: "" });
    }
  }, [usernormal]);
  const handleChange = (e) => {
    setUser({ ...normaluser, [e.target.id]: e.target.value });
  };

  const validate = () => {
    if (!normaluser.nom) {
      setErrors({ name: "Veuilez Entrer le nom " });
      setIsValid(false);
    } else if (usernormal === undefined) {
      if (!normaluser.Mle) {
        setErrors({ Mle: "Veuillez Entrer le numero de matricule " });
        setIsValid(false);
      }
      if (!normaluser.password) {
        setErrors({ password: "Veuillez Entrer le mot de passe " });
        setIsValid(false);
      }
    } else {
      setIsValid(true);
      setErrors({});
    }
    return ref.current;
  };

  const UpdateUser = () => {
    const { user, token } = isAuthenticated();
    fetch(`${API_URL}/admin/update/${user.Mle}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(normaluser),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
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
            `L'utilisateur ${normaluser.nom}  est modifié avec succés `,
            "Modification Utilisateur",
            {
              positionClass: "toast-bottom-left",
            }
          );
          setUser({ Mle: "", password: "", codesce: "", nom: "" });
          dispatch(getusers());
          handleClose();
        }
      })
      .catch((err) => {
        toastr.error(err, "Erreur du serveur", {
          positionClass: "toast-bottom-left",
        });
      });
  };
  const AddUser = () => {
    const { user, token } = isAuthenticated();
    fetch(`${API_URL}/admin/create/${user.Mle}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(normaluser),
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
          handleClose();

          toastr.success(
            `L'utilisateur ${normaluser.nom}  est crée avec succés `,
            "Nouveau Utilisateur",
            {
              positionClass: "toast-bottom-left",
            }
          );
          setUser({ Mle: "", password: "", nom: "" });
          dispatch(getusers());
        }
      })
      .catch((err) => {
        toastr.error(err, "Erreur du serveur", {
          positionClass: "toast-bottom-left",
        });
      });
  };

  const submitUser = (e) => {
    e.preventDefault();
    if (validate()) {
      if (usernormal) {
        UpdateUser();
      } else {
        AddUser();
      }
    }
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {usernormal
              ? `Modification  de l'utilisateur : ${usernormal.nom} Matricule : ${usernormal.Mle}`
              : "Ajout Utilisateur"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Nom</Form.Label>
            <Form.Control
              value={normaluser.nom || ""}
              onChange={handleChange}
              type="text"
              placeholder="nom"
              id="nom"
            />
            <div className="text-danger">{errors.name}</div>
            {!usernormal && (
              <div>
                <Form.Label>Matricule </Form.Label>
                <Form.Control
                  value={normaluser.Mle || ""}
                  onChange={handleChange}
                  type="text"
                  placeholder="Matricule"
                  id="Mle"
                />
                <div className="text-danger">{errors.Mle}</div>
                <Form.Label>Mot de passe </Form.Label>
                <Form.Control
                  value={normaluser.password || ""}
                  onChange={handleChange}
                  type="password"
                  placeholder="Mot de passe "
                  id="password"
                />
                <div className="text-danger">{errors.password}</div>
              </div>
            )}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={submitUser}>
            {usernormal ? "Modifier" : "Ajout"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default AddEditUserModal;
