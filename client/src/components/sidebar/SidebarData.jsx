import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import ListAltIcon from "@material-ui/icons/ListAlt";
import CasinoIcon from "@material-ui/icons/Casino";
import DevicesIcon from "@material-ui/icons/Devices";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import PrintIcon from "@material-ui/icons/Print";
import { VscChecklist } from "react-icons/vsc";
import RoomIcon from "@material-ui/icons/Room";
export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <HomeIcon style={{ width: "20px", height: "20px" }} />,
  },
  {
    title: "Administration",
    path: "#",
    icon: <SupervisorAccountIcon style={{ width: "20px", height: "20px" }} />,
    iconClosed: (
      <ArrowDropDownIcon
        className="caret"
        style={{ width: "20px", height: "20px" }}
      />
    ),
    iconOpened: (
      <ArrowDropUpIcon
        className="caret"
        style={{ width: "20px", height: "20px" }}
      />
    ),

    subNav: [
      {
        title: "Gestion des admins",
        path: "/admin/listusers",
        icon: "fas fa-dice-d6",
      },
      {
        title: "Gestion des agents",
        path: "/admin/agents",
        icon: "fas fa-dice-d6",
      },
      {
        title: "Gestion des services",
        path: "/admin/services",
        icon: "fas fa-dice-d6",
      },
      {
        title: "Gestion des Fournisseurs",
        path: "/admin/fournisseurs",
        icon: "fas fa-dice-d6",
      },
    ],
  },
  {
    title: "Categories",
    path: "/categories",
    icon: <ListAltIcon />,
    iconClosed: (
      <ArrowDropDownIcon
        className="caret"
        style={{ width: "20px", height: "20px" }}
      />
    ),
    iconOpened: (
      <ArrowDropUpIcon
        className="caret"
        style={{ width: "20px", height: "20px" }}
      />
    ),
  },

  {
    title: "Liste des Designations",
    path: "/listdesignation",
    icon: <CasinoIcon style={{ width: "20px", height: "20px" }} />,
    iconClosed: (
      <ArrowDropDownIcon
        className="caret"
        style={{ width: "20px", height: "20px" }}
      />
    ),
    iconOpened: (
      <ArrowDropUpIcon
        className="caret"
        style={{ width: "20px", height: "20px" }}
      />
    ),
    // iconClosed: <span className="fas fa-caret-down caret"></span>,
    // iconOpened: <span className="fas fa-caret-up caret"></span>,
  },
  {
    title: "Les Lieux",
    path: "/lieu",
    icon: <RoomIcon style={{ width: "20px", height: "20px" }} />,
  },
  {
    title: "Saisie et Affectation Materiels",
    path: "/addmtrl",
    icon: <DevicesIcon style={{ width: "20px", height: "20px" }} />,
  },
  {
    title: "Print Materiels",
    path: "/printmateriels",
    icon: <PrintIcon style={{ width: "20px", height: "20px" }} />,
  },
  {
    title: "Inventaire",
    path: "/inventory",
    icon: <VscChecklist style={{ width: "20px", height: "20px" }} />,
  },
];
