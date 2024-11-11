import React from 'react';
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider } from 'react-router-dom'
import TabletReszletek from './components/TabletReszletek';
import TabletLista from './components/TabletLista';
import TabletFelvetel from './components/TabletFelvetel';
import TabletTorles from './components/TabletTorles';
import Kezdolap from './components/Kezdolap';

const router = createBrowserRouter([
  {
    path: "/",
    element: <TabletLista />,
  },
  {
    path: "/Tabletfelvetel",
    element: <TabletFelvetel />,
  },
  {
    path: "/TabletTorles",
    element: <TabletTorles />,
  },
  {
    path: "/Tablet/:id",
    element: <TabletReszletek />,
  },
  {
    path: "/Kezdolap",
    element:<Kezdolap />,
  }
]);


createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
