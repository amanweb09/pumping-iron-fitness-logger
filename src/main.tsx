// import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
import './dist/output.css'
import { Provider } from "react-redux"
import createStore from './lib/store/index.ts'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from './pages/home.tsx'
import Authenticate from './pages/auth.tsx'
import 'react-toastify/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { ProtectedRoute, UnprotectedRoute } from './components/route-protector.tsx'
import Layout from './layout.tsx'
import Routine from './pages/routine.tsx'
import Logger from './pages/logger.tsx'
import CreateRoutine from './pages/create-routine.tsx'
import Error from './pages/error-404.tsx'

const store = createStore()

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute><Home /></ProtectedRoute>
  },
  {
    path: "/auth",
    element: <UnprotectedRoute><Authenticate /></UnprotectedRoute>
  },
  {
    path: "/routine/:routineId",
    element: <ProtectedRoute><Routine /></ProtectedRoute>
  },
  {
    path: "/logger",
    element: <ProtectedRoute><Logger /></ProtectedRoute>
  },
  {
    path: "/create-routine",
    element: <ProtectedRoute><CreateRoutine /></ProtectedRoute>
  },
  {
    path: "*",
    element: <Error code='404' message='Page not found' redirectHref='/' />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <Layout>
      <ToastContainer />
      <RouterProvider router={router} />
    </Layout>
  </Provider>
)

