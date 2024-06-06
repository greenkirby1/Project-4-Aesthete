import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './Root.jsx'

// Page Imports
import Entrance from './components/pages/Entrance.jsx'
import Register from './components/pages/Register.jsx'
import Login from './components/pages/Login.jsx'
import MyCollections from './components/pages/MyCollections.jsx'
import ArtistCollection from './components/pages/ArtistCollection.jsx'
import Gallery from './components/pages/Gallery.jsx'
import Profile from './components/pages/Profile.jsx'

// Styles Imports
import './styles/main.scss'

// Router
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '',
        element: <Entrance />
      },
      {
        path: 'join-us',
        element: <Register />
      },
      {
        path: 'welcome-back',
        element: <Login />
      },
      {
        path: 'my-collections',
        element: <MyCollections />
      },
      {
        path: 'gallery',
        element: <Gallery />,
      },
      {
        path: 'gallery/:username',
        element: <ArtistCollection />
      },
      {
        path: 'profile',
        element: <Profile />
      }
    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
