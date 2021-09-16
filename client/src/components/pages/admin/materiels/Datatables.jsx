import React, { useEffect, useRef } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";

import jsZip from "jszip";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
//Datatable Modules

import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";

import "datatables.net-buttons/js/buttons.colVis.js";
import "datatables.net-buttons/js/buttons.flash.js";
import "datatables.net-buttons/js/buttons.html5.js";
import "datatables.net-buttons/js/buttons.print.js";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import $ from "jquery";
import "./styleentete.css";
// import "bootstrap/dist/css/bootstrap.css";
import Entete from "./Entete";
$.DataTable = require("datatables.net-dt");
window.JSZip = jsZip;
// import Entete from "./Entete";
function Datatables(Props) {
  const { data, title } = Props;
  useEffect(() => {
    $(main.current).DataTable({
      orderCellsTop: true,
      fixedHeader: true,
      scrollX: true,
      responsive: true,
      dom: "Bfrtip",

      buttons: [
        {
          exportOptions: {
            columns: [2, 11, 12, 15, 17], //Your Column value those you want
          },
          extend: "print",
          text: '<i class="fas fa-print"></i>',
          title: "",
          message: "",
          orientation: "landscape",
          autoPrint: false,
          customize: function (win) {
            $(win.document.body)
              // .css("font-size", "10pt")
              .prepend($(Entete(title)));
          },
        },
        {
          exportOptions: {
            columns: [2, 11, 12, 15, 17], //Your Column value those you want
          },
          extend: "excel",
          text: '<i class="fas fa-file-excel" ></i>',
          title: { title },
          orientation: "landscape",
        },
      ],

      data: data,
      //   processing: true,
      columns: columns,

      //   retrieve: true,
      //   ordering: false,
    });
    return () => {
      $(main.current).DataTable().destroy(true);
    };
  }, []);
  const main = useRef(null);
  const columns = [
    {
      data: "idmateriel",
      visible: false,
    },

    {
      data: "iddesignation",
      visible: false,
    },
    {
      data: "numeroinventaire",
      title: "Numero Inventaire",
    },
    {
      name: "garentie",
      visible: false,
      render: function (data) {
        if (data === undefined) {
          return "";
        } else {
          data;
        }
      },
    },
    {
      data: "datereceptionprovisoire",
      visible: false,
    },
    {
      data: "Affecter",
      visible: false,
    },
    {
      data: "idtype",
      visible: false,
    },

    {
      data: "IDFournisseur",
      visible: false,
    },
    {
      data: "idagence",
      visible: false,
    },
    {
      data: "mleagent",
      visible: false,
    },
    {
      data: "idservice",
      visible: false,
      defaultContent: "",
    },
    {
      title: "Disponible",
      data: "disponible",

      defaultContent: "",
    },
    {
      title: "lieu",
      data: "lieu.lieu",
      defaultContent: "",
    },
    {
      data: "idagence",
      visible: false,
    },
    {
      title: "Agent",
      data: "agent.agent_full_name",
      defaultContent: "",
    },
    {
      title: "Category",
      data: "typemateriel.type",
    },
    {
      data: "fournisseur.NomFournisseur",
      visible: false,
      defaultContent: "",
    },
    {
      title: "Designation",
      data: "designation.designation",
    },
  ];
  return <table ref={main} className="display" style={{ width: "100%" }} />;
}

export default Datatables;
