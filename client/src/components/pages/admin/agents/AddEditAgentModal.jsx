import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import toastr from "toastr";
import "toastr/build/toastr.css";

import useStateRef from "react-usestateref";
import { API_URL } from "../../../../config";
import { isAuthenticated } from "../../../../auth/helpers";
import { getagents } from "../../../../actions/getagentsAction";
import { getAgencies, getservices } from "../../../../core/ApiCore";

function AddEditAgentModal({ Mle, show, handleClose }) {
  const [services, setservices] = useState([]);
  const [agencies, setAgencies] = useState([]);
  const [, setIsValid, ref] = useStateRef(true);
  const [errors, setErrors] = useState({});

  const [normaluser, setUser] = useState({
    agent_number: "",
    agent_full_name: "",
    agent_email: "",
    agency_id: "",
    service_id: "",
  });

  const dispatch = useDispatch();
  const usernormal = useSelector((state) =>
    Mle ? state.agentsReducer.find((p) => p.agent_number === Mle) : null
  );
  useEffect(() => {
    getservices()
      .then((res) => setservices(res))
      .catch((err) => console.log(err));
    getAgencies()
      .then((res) => setAgencies(res))
      .catch((err) => console.log(err));
    if (usernormal) {
      setUser(usernormal);
    } else {
      setUser({
        agent_number: "",
        agent_full_name: "",
        agent_email: "",
        agency_id: "",
        service_id: "",
      });
    }
  }, [usernormal]);
  const handleChange = (e) => {
    setUser({ ...normaluser, [e.target.id]: e.target.value });
  };
  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  const validate = () => {
    if (!normaluser.agent_full_name) {
      setErrors({ agent_full_name: "Veuilez Entrer le nom " });
      setIsValid(false);
    } else if (usernormal === undefined) {
      if (!normaluser.agent_number) {
        setErrors({ agent_number: "Veuillez Entrer le numero de matricule " });
        setIsValid(false);
      }
      //    if(!normaluser.password){
      //     setErrors({password:'Veuillez Entrer le mot de passe '})
      //     setIsValid(false)
      //   }
    } else if (!normaluser.agent_email) {
      setErrors({ agent_email: "Veuillez saisir votre email " });
      setIsValid(false);
    } else if (!validateEmail(normaluser.agent_email)) {
      setErrors({ Email: "l'email n'est pas valide" });
      setIsValid(false);
    } else if (!normaluser.service_id) {
      setErrors({ service: "Veuillez selectionner le service " });
      setIsValid(false);
    } else if (!normaluser.agency_id) {
      setErrors({ agency_id: "Veuillez selectionner l'agence" });
      setIsValid(false);
    } else {
      setIsValid(true);
      setErrors({});
    }
    return ref.current;
  };

  const UpdateUser = () => {
    const { user, token } = isAuthenticated();
    fetch(`${API_URL}/agents/update/${user.Mle}`, {
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
            `L'agent matricule ${normaluser.agent_number}  est modifié avec succés `,
            "Modification Utilisateur",
            {
              positionClass: "toast-bottom-left",
            }
          );
          setUser({
            agent_number: "",
            agent_full_name: "",
            agent_email: "",
            agency_id: "",
            service_id: "",
          });
          dispatch(getagents());
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
    fetch(`${API_URL}/agents/create/${user.Mle}`, {
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
          setUser({ Mle: "", password: "", codesce: "", nom: "", Email: "" });
          dispatch(getagents());
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
              ? `Modification  de l'utilisateur : ${usernormal.agent_full_name} Matricule : ${usernormal.agent_number}`
              : "Ajout Utilisateur"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Nom Complet </Form.Label>
            <Form.Control
              value={normaluser.agent_full_name || ""}
              onChange={handleChange}
              type="text"
              placeholder="nom"
              id="agent_full_name"
            />
            <div className="text-danger">{errors.name}</div>
            {!usernormal && (
              <div>
                <Form.Label>Matricule </Form.Label>
                <Form.Control
                  value={normaluser.agent_number || ""}
                  onChange={handleChange}
                  type="text"
                  placeholder="Matricule"
                  id="agent_number"
                />
                <div className="text-danger">{errors.Mle}</div>
                {/* <Form.Label>Mot de passe </Form.Label>
            <Form.Control value={normaluser.password || '' } onChange={handleChange}   type="password" placeholder="Mot de passe " id="password" />
            <div className="text-danger">{errors.password}</div>
           */}{" "}
              </div>
            )}
            <Form.Label>Email</Form.Label>
            <Form.Control
              value={normaluser.agent_email || ""}
              onChange={handleChange}
              type="Email"
              placeholder="Email"
              id="agent_email"
            />
            <div className="text-danger">{errors.Email}</div>
            <Form.Label>Service </Form.Label>
            <select
              value={normaluser.service_id || ""}
              id="service_id"
              onChange={handleChange}
              className="form-control"
              aria-label="Default select example"
            >
              <option value="">Selectionner un service</option>

              {services &&
                services.map((service, i) => (
                  <option value={service.id}>{service.service_name}</option>
                ))}
            </select>
            <div className="text-danger">{errors.service}</div>
            <Form.Label>Agence </Form.Label>
            <select
              value={normaluser.agency_id || ""}
              id="agency_id"
              onChange={handleChange}
              className="form-control"
              aria-label="Default select example"
            >
              <option value="">Selectionner une agence</option>

              {agencies &&
                agencies.map((agency, i) => (
                  <option value={agency.id}>{agency.agency_name}</option>
                ))}
            </select>
            <div className="text-danger">{errors.service}</div>
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
export default AddEditAgentModal;
