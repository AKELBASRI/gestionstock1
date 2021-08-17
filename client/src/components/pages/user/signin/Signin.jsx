import React, { useState } from "react";
import { API_URL } from "../../../../config";
import "./signin.css";
import toastr from "toastr";
import "toastr/build/toastr.css";
import logo from "../../../logo_radeeo.jpg";
import hero from "../../../hero.png";
import Layout from "../../Layout/Layout";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import { ColorButton } from "../../../../core/styleModalForm";

const useStyles = makeStyles(() => ({
  root: {
    "& > *": {
      width: "25ch",
      marginBottom: "12px",
    },
  },
  width: {
    width: "50%",
    "@media (max-width: 991px)": {
      width: "100%",
    },
  },
  ml: {
    "@media (max-width: 991px)": {
      marginLeft: "-20px",
    },
  },
  textsm: {
    fontSize: "15px",
  },

  input: {
    height: 0.5,
    color: "#2c3e50",
    fontSize: "13px",
    letterSpacing: "1px",
    "&::placeholder": {
      color: "#bdbdbd",
      opacity: "1",
      fontWeight: "300",
    },
    "&::-ms-input-placeholder": {
      color: "#bdbdbd",
      fontWeight: "300",
    },

    "&:::-ms-input-placeholder": {
      color: "#bdbdbd",
      fontWeight: 300,
    },
  },

  media: {
    width: "70px",
    height: "90px",
    marginTop: "20px",
    marginLeft: "250px",
    "@media (max-width: 991px)": {
      marginLeft: "0px",
    },
  },
  title: {
    fontSize: "17px",
    marginLeft: "20px",
    fontWeight: "bold",
    "@media (max-width: 991px)": {
      marginTop: "12px",
      fontSize: "auto",
    },
  },
  image: {
    marginTop: "-30px",
    width: "500px",
    height: "400px",
    "@media (max-width: 991px)": {
      marginTop: "60px",
      width: "530px",
      height: "210px",
    },
  },
  card2: {
    margin: "0px 40px",
    "@media (max-width: 991px)": {
      margin: "0px 15px",
    },
  },
  box2: {
    "@media (max-width: 991px)": {
      display: "flex",
      justifyContent: "center",
    },
  },
}));
function Signin(Props) {
  const [user, setUser] = useState({
    Mle: "",
    password: "",
  });
  const handleChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };
  const submitSignin = (e) => {
    e.preventDefault();
    fetch(`${API_URL}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
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
          localStorage.setItem("jwt_info", JSON.stringify(res));
          Props.history.push({
            pathname: "/",
            state: { state: true },
          });
          toastr.info("Authentification réussie", "Bienvenue", {
            positionClass: "toast-top-right",
          });
        }
      })
      .catch((err) => {
        toastr.error(err, "Erreur du serveur", {
          positionClass: "toast-top-right",
        });
      });
  };

  const classes = useStyles();
  return (
    <div>
      <Layout>
        <Box display="flex" flexWrap="wrap">
          <Box className={classes.width}>
            <Box display="flex" alignItems="center">
              <CardMedia
                component="img"
                className={classes.media}
                image={logo}
                title="logo"
              />
              <Typography className={classes.title}>
                Gestion Stock Informatique
              </Typography>
            </Box>

            <Grid container justifyContent="center">
              <CardMedia
                component="img"
                className={classes.image}
                image={hero}
                title="hero"
              />
            </Grid>
          </Box>
          <Box flexGrow="1" className={classes.box2}>
            <Box component="div" className={classes.card2} py={5}>
              <Box display="flex" alignItems="center">
                <Box display="flex" flexDirection="column">
                  <Box component="div" mb="2" className={classes.textsm}>
                    Matricule
                  </Box>

                  <form className={classes.root} noValidate autoComplete="off">
                    <TextField
                      variant="outlined"
                      placeholder="Matricule"
                      InputProps={{ classes: { input: classes["input"] } }}
                      onChange={handleChange}
                      id="Mle"
                      autoFocus
                    />
                  </form>
                </Box>
              </Box>

              <Box display="flex" flexDirection="column">
                <Box component="div" mb="2" className={classes.textsm}>
                  Mot de passe
                </Box>
                <form className={classes.root} noValidate autoComplete="off">
                  <TextField
                    id="password"
                    variant="outlined"
                    placeholder="Mot de passe"
                    InputProps={{ classes: { input: classes["input"] } }}
                    onChange={handleChange}
                    type="password"
                  />
                </form>
              </Box>

              <Box mb="20px"></Box>
              <Grid>
                <ColorButton
                  variant="contained"
                  type="submit"
                  color="primary"
                  className={classes.margin}
                  onClick={submitSignin}
                >
                  LOGIN
                </ColorButton>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Layout>
    </div>
  );
}
export default Signin;
