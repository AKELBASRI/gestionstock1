import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
function SubMenu(Props) {
  const [subnav, setSubnav] = useState(false);
  const showSubnav = () => setSubnav(!subnav);
  Props.item1.close = () => {
    setSubnav(false);
  };
  const isActive = (history, path) => {
    if (history.location.pathname === path) {
      return {
        background: "#172b4d",
        width: "100%",
      };
    } else {
      return {
        width: "100%",
      };
    }
  };
  const clickitem = (item1, path) => {
    if (item1.item.subNav) {
      showSubnav();
    } else if (path) {
      Props.onOpen(item1.key);
    }
  };
  useEffect(() => {
    if (subnav) {
      Props.onOpen(Props.item1.key);
    }
  }, [Props.item1.key, Props.onOpen, subnav]);
  return (
    <div>
      <ul>
        <li>
          <Link
            to={Props.item1.item.subNav ? "#" : Props.item1.item.path}
            style={isActive(Props.props.history, Props.path)}
            onClick={() => clickitem(Props.item1, Props.item1.item.path)}
          >
            <span>
              <i className={Props.item1.item.icon}></i>
            </span>
            <Title state={Props.state}>{Props.item1.item.title}</Title>
            {Props.item1.item.subNav &&
              (Props.item1.item.subNav && subnav
                ? Props.item1.item.iconOpened
                : Props.item1.item.subNav
                ? Props.item1.item.iconClosed
                : null)}
          </Link>

          {subnav && (
            <ShowLeft state={Props.state}>
              {subnav &&
                Props.item1.item.subNav &&
                Props.item1.item.subNav.map((item, index) => {
                  return (
                    <li key={index}>
                      <Link
                        to={item.path}
                        style={isActive(Props.props.history, item.path)}
                      >
                        <SubTitle>{item.title}</SubTitle>
                      </Link>
                    </li>
                  );
                })}
            </ShowLeft>
          )}
        </li>
      </ul>
    </div>
  );
}

export default withRouter(SubMenu);

const ShowLeft = styled.div`
  ${({ state }) =>
    !state
      ? `
    position: fixed !important;
    display: block;
    left: 90px;
    transform: translateY(-25%);
    background-color:#011627 ;
    transition: all 1s ease;
`
      : ""}
`;
const Title = styled.div`
  display: ${({ state }) => (!state ? "none" : "block")};
  font-size: 16px;
  margin-left: 20px;
  font-weight: bold;
`;
const SubTitle = styled.div`
  font-size: 16px;
  margin-left: 20px;
  font-weight: bold;
  padding-left: 20px;
`;
