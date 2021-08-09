import React from 'react';


export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: "fas fa-home"
  
  },
  {
    
    title: 'Administration',
    path: '#',
    icon: "fas fa-user-shield",
    iconClosed: <span className="fas fa-caret-down caret"></span>,
    iconOpened: <span className="fas fa-caret-up caret"></span>,
    
    subNav: [
      {
        title: 'Gestion des admins',
        path: '/admin/listusers',
        icon: "fas fa-dice-d6"
      },
      {
        title: 'Gestion des agents',
        path: '/admin/agents',
        icon: "fas fa-dice-d6"
      },
      {
        title: 'Gestion des services',
        path: '/admin/services',
        icon: "fas fa-dice-d6"
      },
      {
        title: 'Gestion des Fournisseurs',
        path: '/admin/fournisseurs',
        icon: "fas fa-dice-d6"
      },

    ]
  },
  {
    title: 'Categories',
    path: '/categories',
    icon: "fas fa-list-alt",
    iconClosed: <span className="fas fa-caret-down caret"></span>,
    iconOpened: <span className="fas fa-caret-up caret"></span>,


  },
  {
    title: 'Saisie et Affectation Materiels',
    path: '/addmtrl',
    icon: "fas fa-laptop"
  },

  {
    title: 'Liste des Designations',
    path: '/listdesignation',
    icon: "fas fa-dice-d6",
    iconClosed: <span className="fas fa-caret-down caret"></span>,
    iconOpened: <span className="fas fa-caret-up caret"></span>,

  }

];
