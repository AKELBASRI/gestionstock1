// import React from "react";

import "./styleentete.css";
import logo from "../../../../logo_radeeo.jpg";
// var imglogo = document.createElement("img");
// imglogo.src = logo;

const Entete = () => {
  return `<div class="entete">\
  <div class="division">\
  <div>Division : Support </div>\
  <div>Service : Systeme d\`information </div>\
  </div>\
  <div class="title">Inventaire Informatique RADEEO</div>\
    <div class="image">\
      <img src="
        ${
          window.location.origin + logo
        }" width="60px" height="90px" alt="logo" />\
  </div>\
</div>`;
};

export default Entete;
