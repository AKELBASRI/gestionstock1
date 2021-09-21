import React, { useEffect } from "react";
import Layout from "../../Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { FetchMateriels } from "../../../store/actions";
import Datatables from "./Datatables";
// $.DataTable = require("datatables.net");

// $.DataTable = require("datatables.net");

// require("datatables.net-dt");

function ProposerReforme() {
  let listmateriels1 = useSelector(
    (state) => state.requests?.queries?.FETCH_MATERIELS?.data
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(FetchMateriels());
    // $.fn.dataTable.ext.errMode = "none";
    // dispatch(FetchMateriels());
  }, [dispatch]);

  return (
    <Layout>
      {listmateriels1 && (
        <Datatables
          title={"Materiel Reforme Informatique RADEEO"}
          data={listmateriels1.filter((materiel) => {
            return materiel.proposerreforme === 1;
          })}
        />
      )}
    </Layout>
  );
}

export default ProposerReforme;
