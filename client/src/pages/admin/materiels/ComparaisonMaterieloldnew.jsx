import React, { useEffect, useRef } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";

import jsZip from "jszip";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
//Datatable Modules
import { useStyles } from "../../../core/styleModalForm";
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
import customAxios from "../../../axios/CustomAxios";
import { isAuthenticated } from "../../../auth/helpers";
import { ColorButton } from "../../../core/styleModalForm";
import toastr from "toastr";
import "toastr/build/toastr.css";
import Entete from "./Entete";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../Layout/Layout";
import { Grid } from "@material-ui/core";

import { Fetch_years } from "../../../store/actions";
import ReactHookFormReactSelect from "../../../core/Components/ReactHookReactSelect";
import { useForm } from "react-hook-form";
$.DataTable = require("datatables.net-dt");
window.JSZip = jsZip;
// import MUIDataTable from "mui-datatables";
function ComparaisonMaterieloldnew() {
  // const [year, setYear] = useState(0);
  let table;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Fetch_years());

    // dispatch(Fetch_table_comparaison());
    // $.fn.dataTable.ext.errMode = "none";
    // dispatch(FetchMateriels());
  }, [dispatch]);
  const years = useSelector(
    (state) => state.requests?.queries?.FETCH_YEARS?.data
  );
  const classes = useStyles();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const optionsYears =
    years &&
    years.map((year) => ({
      value: year.year,
      label: year.year,
    }));
  const getTableComparaison = (year) => {
    const { user } = isAuthenticated();
    customAxios
      .get(`/materiels/comparaison/${user.Mle}`, {
        params: { year: year },
      })

      .then((res) => {
        LoadDatatable(res.data);
      })
      .catch((err) => {
        if (err.response.status >= 400 && err.response.status < 500) {
          toastr.warning(
            err.response.data.error,
            "S'il vous plaît Veuillez vérifier le Formulaire",
            {
              positionClass: "toast-bottom-left",
            }
          );
        } else {
          toastr.error(err.response.data.error, "Erreur du serveur", {
            positionClass: "toast-bottom-left",
          });
        }
      });
  };
  const columns = [
    {
      data: "numeroinventaire",
      title: "Numero Inventaire",
    },
    {
      data: "designationname",
      title: "Designation",
    },

    {
      title: "Nouveau Lieu",
      data: "nouveaulieu",
    },
    {
      title: "Nouvelle agence",
      data: "newagency",
    },
    {
      title: "Nouveau Service",
      data: "newservice",
    },
    {
      title: "Ancien Lieu",
      data: "oldPlace",
    },
    {
      title: "Ancien Agence",
      data: "oldagency",
    },

    {
      title: "Ancien Service",
      data: "oldservice",
    },
  ];
  //   const options = {
  //     pagination: true,
  //     // filter: true,
  //     // filterType: 'dropdown',
  //     responsive: "standard",
  //     selectableRows: "none",
  //   };
  const main = useRef(null);
  const LoadDatatable = (data) => {
    table = $(main.current).DataTable({
      scrollX: true,
      responsive: true,
      paging: false,
      destroy: true,
      dom: "Bfrtip",
      buttons: [
        {
          extend: "print",
          text: '<i class="fas fa-print"></i>',
          title: "",
          message: "",
          orientation: "landscape",

          customize: function (win) {
            $(win.document.body)
              // .css("font-size", "10pt")
              .prepend($(Entete("Comparaison Materiel Informatique")));
          },
        },
        {
          extend: "excel",
          text: '<i class="fas fa-file-excel" ></i>',
          title: "Comparaison Materiel Informatique",
          orientation: "landscape",
        },
      ],

      data: data,
      //   processing: true,
      columns: columns,

      //   retrieve: true,
      //   ordering: false,
    });
  };
  const onSubmit = (data) => {
    getTableComparaison(data.object.year);
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <Grid
          container
          spacing={3}
          direction="row"
          justifyContent="center"
          // alignItems="center"
        >
          <Grid item xs={7}>
            <ReactHookFormReactSelect
              options={optionsYears}
              className={classes.SelectSearch}
              id="object.year"
              Name="object.year"
              control={control}
              reef={register("object.year", {
                required: "You must specify a year",
              })}
              Value=""
            />

            {errors["object"]?.year && (
              <p className={classes.para}>
                {errors["object"]?.year?.message || "You must select a year"}
              </p>
            )}
          </Grid>
          <Grid item>
            <ColorButton type="submit">RECHERCHER</ColorButton>
          </Grid>
        </Grid>
        <Grid item>
          <table ref={main} className="display" style={{ width: "100%" }} />
        </Grid>
      </form>
    </Layout>
  );
}

export default ComparaisonMaterieloldnew;
