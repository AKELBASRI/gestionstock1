import React from "react";
import FeaturedInfo from "../../../featuredInfo/FeaturedInfo";
import Layout from "../../Layout/Layout";
import styled from "styled-components";

function Home() {
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
