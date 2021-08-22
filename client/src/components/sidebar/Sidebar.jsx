import React, { useState, useEffect, useRef } from "react";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { GiHamburgerMenu } from "react-icons/gi";
import { showorhidesidebar } from "../../actions/showorhideAction";
import { isAuthenticated } from "../../auth/helpers";
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";
import styled from "styled-components";
const Sidebar = (props) => {
  const dispatch = useDispatch();
  const sidebar = useRef(null);
  const [active, setactive] = useState(false);
  const state = useSelector((state) => state.showorhidereducers);
  const keys = SidebarData.map(function (item, key) {
    return { key: key, close: null, item: item };
  });
  const onOpen = (key) => {
    keys.forEach((x) => {
      if (x.key !== key && x.close !== null) {
        x.close();
      }
    });
  };
  const openNav = () => {
    dispatch(showorhidesidebar(true));
    if (sidebar.current) {
      sidebar.current.style.width = "322px";
      setactive(false);
      sidebar.current.classList.remove("active");
    }
  };

  const closeNav = () => {
    dispatch(showorhidesidebar(false));
    if (sidebar.current) {
      sidebar.current.style.width = "90px";
      sidebar.current.classList.add("active");
      setactive(true);
    }
  };

  useEffect(() => {
    if (window.matchMedia("(min-width: 728px)").matches) {
      /* the view port is at least 400 pixels wide */
      if (sidebar.current) {
        sidebar.current.style.width = "322px";
        setactive(false);
        sidebar.current.classList.remove("active");
      }
    } else {
      /* the view port is less than 400 pixels wide */
      if (sidebar.current) {
        sidebar.current.style.width = "90px";
        sidebar.current.classList.add("active");
        setactive(true);
      }
    }
  }, []);

  return (
    <div>
      {isAuthenticated() ? (
        // <div id="mySidenav" className={`sidenav`} ref={sidebar}>
        <SideNav ref={sidebar} active={active}>
          <Titleapp active={active}>Gestion Stock</Titleapp>
          {state ? (
            <CloseBtn onClick={closeNav}>&times;</CloseBtn>
          ) : (
            <Humberger>
              {" "}
              <GiHamburgerMenu onClick={openNav} />{" "}
            </Humberger>
          )}

          {keys.map((item, index) => {
            return (
              <SubMenu
                onOpen={onOpen}
                item1={item}
                key={index}
                state={state}
                props={props}
              />
            );
          })}

          {/* </div> */}
        </SideNav>
      ) : (
        ""
      )}
    </div>
  );
};
export default withRouter(Sidebar);
const CloseBtn = styled.div`
  position: absolute;
  top: 10px;
  right: 30px;
  font-size: 36px;
  margin-left: 50px;
  color: white;
  cursor: pointer;
`;
const Humberger = styled(CloseBtn)``;
const Titleapp = styled.div`
  left: 30px;
  top: 23px;
  right: 19px;
  position: fixed;
  font-size: 20px;
  font-weight: bold;
  color: white;
  display: ${({ active }) => (active ? "none" : "block")};
`;
const SideNav = styled.div`
  z-index: 1234 !important;
  height: 100%;
  width: 322px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #011627 !important;
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 80px;
  transition: all 0.5s ease;

  a:hover,
  a.active {
    background: #172b4d;
    width: 100%;
  }

  a span.caret {
    position: absolute;
    right: 22px;
  }
  a {
    color: #fff;
    font-size: 18px;
    padding: 20px 30px;
    white-space: nowrap;
    display: flex;
    align-items: center;
    margin-bottom: 1px;
    transition: all 1s ease;
  }

  ul li a {
    font-size: 13px;
    color: #e6e6e6;
    padding-left: 40px;
  }

  ul {
    position: static;
    display: block;
    transition: all 1s ease;
  }

  ul li a {
    padding-left: 20px;
    display: block !important;
  }

  a span.title,
  a > .caret,
  .titleapp span.title,
  .titleapp {
    display: ${({ active }) => (active ? "none" : "block")};
  }

  ul ul li a span.title {
    display: ${({ active }) => (active ? "none" : "block")};
    transition: all 1s ease;
  }
  ul a span.title,
  .titleapp span.title {
    display: ${({ active }) => (active ? "none" : "block")};
    transition: all 0.3s ease;
  }
  ul.showleft {
    position: fixed !important;
    display: block;
    left: 90px;
    transform: translateY(-25%);
    background-color: #011627;
    transition: all 1s ease;
  }
`;
