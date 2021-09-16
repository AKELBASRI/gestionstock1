import React, { useEffect } from "react";
import FeaturedInfo from "../../../featuredInfo/FeaturedInfo";
import Layout from "../../Layout/Layout";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { FetchCategory, Fetch_table_exist } from "../../../../store/actions";
function Home() {
  const dispatch = useDispatch();
  const listcategories = useSelector(
    (state) => state.requests?.queries?.FETCH_CATEGORY?.data
  );
  useEffect(() => {
    dispatch(Fetch_table_exist());
    dispatch(FetchCategory());
  }, [dispatch]);
  return (
    <Layout>
      <Container>
        {listcategories && (
          <FeaturedInfo listcategories={listcategories && listcategories} />
        )}
      </Container>
    </Layout>
  );
}

export default Home;
const Container = styled.div`
  flex: 4;
`;
