import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import toastr from "toastr";
import "toastr/build/toastr.css";
import useStateRef from "react-usestateref";
import { isAuthenticated } from "../../../../auth/helpers";
import { API_URL } from "../../../../config";
function ChangePasswordModal({ usernormal, show, handleClose }) {
  const [input, setInput] = useState({ password: "", password2: "" });
  const [errors, setErrors] = useState({});
  const [, setIsValid, ref] = useStateRef(true);
  const handleChange = (e) => {
    setInput({ ...input, [e.target.id]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const { user, token } = isAuthenticated();

      fetch(`${API_URL}/admin/updatepassword/${user.Mle}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ password: input.password, Mle: usernormal.Mle }),
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
              `Changement mot de passe bien effectué ${usernormal.nom}   `,
              "Changement mot de passe Utilisateur",
              {
                positionClass: "toast-bottom-left",
              }
            );
            setInput({ password: "", password2: "" });
            setErrors({});
            handleClose();
          }
        })
        .catch((err) => {
          toastr.error(err, "Erreur du serveur", {
            positionClass: "toast-bottom-left",
          });
        });
    }
  };
  const validate = () => {
    if (!input.password) {
      setErrors({ password: "Veuilez Entrer le nouveau mot de passe" });
      setIsValid(false);
    } else if (!input.password2) {
      setErrors({ password2: "Veuillez Confirmer le nouveau  mot de passe" });
      setIsValid(false);
    } else if (
      typeof input.password !== "undefined" &&
      typeof input.password2 !== "undefined"
    ) {
      if (input.password !== input.password2) {
        setIsValid(false);
        setErrors({ password2: "les mot de passes ne correspond pas" });
      } else {
        setIsValid(true);
      }
    }
    return ref.current;
  };
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Modification mot de passe du : {usernormal.nom} Matricule :{" "}
            {usernormal.Mle}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Mot de passe</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="password"
              placeholder="Mot de passe"
              id="password"
            />
            <div className="text-danger">{errors.password}</div>

            <Form.Label>Confirmer mot de passe </Form.Label>
            <Form.Control
              onChange={handleChange}
              type="password"
              placeholder="Confirmer mot de passe"
              id="password2"
            />
            <div className="text-danger">{errors.password2}</div>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Changement mot de passe
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ChangePasswordModal;
