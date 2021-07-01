import React from 'react';


export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: "fas fa-dice-d6"
  },
  {
    
    title: 'Administration',
    path: '#',
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
        path: '/admin/agents',
        icon: "fas fa-dice-d6"
      }
    ]
  },
  {
    title: 'Categories',
    path: '/categories',
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
        path: '/admin/agents',
        icon: "fas fa-dice-d6"
      }
    ]
  },
  {
    title: 'Saisie Materiels',
    path: '/addmtrl',
    icon: "fas fa-dice-d6"
  },

  {
    title: 'Affectation Materiels',
    path: '/affctmtrl',
    icon: "fas fa-dice-d6",
    iconClosed: <span className="fas fa-caret-down caret"></span>,
    iconOpened: <span className="fas fa-caret-up caret"></span>,
    
  }

];
