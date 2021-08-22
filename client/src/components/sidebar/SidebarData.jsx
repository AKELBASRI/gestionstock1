import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import ListAltIcon from "@material-ui/icons/ListAlt";
import CasinoIcon from "@material-ui/icons/Casino";
import DevicesIcon from "@material-ui/icons/Devices";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <HomeIcon />,
  },
  {
    title: "Administration",
    path: "#",
    icon: <SupervisorAccountIcon />,
    iconClosed: <ArrowDropDownIcon className="caret" />,
    iconOpened: <ArrowDropUpIcon className="caret" />,

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
    iconClosed: <ArrowDropDownIcon className="caret" />,
    iconOpened: <ArrowDropUpIcon className="caret" />,
  },

  {
    title: "Liste des Designations",
    path: "/listdesignation",
    icon: <CasinoIcon />,
    iconClosed: <ArrowDropDownIcon className="caret" />,
    iconOpened: <ArrowDropUpIcon className="caret" />,
    // iconClosed: <span className="fas fa-caret-down caret"></span>,
    // iconOpened: <span className="fas fa-caret-up caret"></span>,
  },

  {
    title: "Saisie et Affectation Materiels",
    path: "/addmtrl",
    icon: <DevicesIcon />,
  },
];
