import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';

export const SidebarData = [
  {
    title: 'Administration',
    path: '/',
    icon: "fas fa-dice-d6",
    iconClosed: <span className="fas fa-caret-down caret"></span>,
    iconOpened: <span className="fas fa-caret-up caret"></span>,

    subNav: [
      {
        title: 'Gestion des admins',
        path: '/admin/listusers',
        icon: "fas fa-dice-d6"
      },
      {
        title: 'Gestion agents',
        path: '/admin/revenue',
        icon: "fas fa-dice-d6"
      }
    ]
  },
  {
    title: 'Categories',
    path: '/categories',
    icon: "fas fa-dice-d6"
  },
  {
    title: 'Saisie Materiels',
    path: '/addmtrl',
    icon: "fas fa-dice-d6"
  },

  {
    title: 'Affectation Materiels',
    path: '/support',
    icon: "fas fa-dice-d6"
  }
];
