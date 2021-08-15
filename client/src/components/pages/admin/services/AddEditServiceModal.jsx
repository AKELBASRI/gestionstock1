import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import useStateRef from "react-usestateref";

import toastr from "toastr";
import "toastr/build/toastr.css";
import { useDispatch, useSelector } from "react-redux";
import { getservices } from "../../../../actions/getserviceAction";
import { isAuthenticated } from "../../../../auth/helpers";
import { API_URL } from "../../../../config";

function AddEditServiceModal(Props) {
  const [, setIsValid, ref] = useStateRef(true);
  const [nservice, setService] = useState({
    id: "",
    service_name: "",
  });
  const dispatch = useDispatch();
  const service = useSelector((state) =>
    Props.CodeSce
      ? state.serviceReducer.find((p) => p.id === Props.CodeSce)
      : null
  );
  useEffect(() => {
    if (service) {
      setService(service);
    } else {
      setService({});
    }
  }, [service]);
  const [errors, setErrors] = useState({});
  const validate = () => {
    if (!nservice.service_name) {
      setErrors({ Libelle: "Veuilez Entrer le nom du service " });
      setIsValid(false);
    } else {
      setIsValid(true);
      setErrors({});
    }
    return ref.current;
  };
  const AddService = () => {
    const { user, token } = isAuthenticated();
    fetch(`${API_URL}/service/create/${user.Mle}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(nservice),
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
            `Le service ${nservice.Libelle}  est crée avec succés `,
            "Nouveau Service",
            {
              positionClass: "toast-bottom-left",
            }
          );
          setService({ Libelle: "" });
          dispatch(getservices());
          Props.handleClose();
        }
      })
      .catch((err) => {
        toastr.error(err, "Erreur du serveur", {
          positionClass: "toast-bottom-left",
        });
      });
  };
  const updateService = () => {
    const { user, token } = isAuthenticated();
    fetch(`${API_URL}/service/update/${user.Mle}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(nservice),
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
          dispatch(getservices());
          //props.history.push('/');
          toastr.success(
            `Le service ${service.service_name}  est modifié avec succés `,
            "Modification Service",
            {
              positionClass: "toast-bottom-left",
            }
          );
          setService({ service_name: "" });

          Props.handleClose();
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
      if (!Props.CodeSce) {
        AddService();
      } else {
        updateService();
      }
    }
  };
  const handleChange = (e) => {
    setService({ ...nservice, [e.target.id]: e.target.value });
  };

  return (
    <div>
      <Modal show={Props.show} onHide={Props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {service
              ? `Modification  du service : ${service.service_name} `
              : "Ajout Service"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Libelle </Form.Label>
            <Form.Control
              value={nservice.service_name || ""}
              onChange={handleChange}
              type="text"
              placeholder="Libelle"
              id="service_name"
            />
            <div className="text-danger">{errors.Libelle}</div>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={Props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={Submit}>
            {Props.CodeSce !== undefined ? "Modifier" : "Ajout"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddEditServiceModal;
