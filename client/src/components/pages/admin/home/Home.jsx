import React, { useEffect } from "react";
import FeaturedInfo from "../../../featuredInfo/FeaturedInfo";
import Layout from "../../Layout/Layout";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { Fetch_table_exist } from "../../../../store/actions";
function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Fetch_table_exist());
  }, [dispatch]);
  return (
    <Layout>
      <Container>
        <FeaturedInfo />
      </Container>
    </Layout>
  );
}

export default Home;
const Container = styled.div`
  flex: 4;
`;
