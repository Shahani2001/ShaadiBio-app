import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './assets/context/AuthContext.jsx'
import Layout from './assets/components/Layout.jsx'
import Landing from './assets/pages/Landing.jsx'
import Login from './assets/pages/Login.jsx'
import Register from './assets/pages/Register.jsx'
import Dashboard from './assets/pages/Dashboard.jsx'
import CreateBiodata from './assets/pages/CreateBiodata.jsx'
import EditBiodata from './assets/pages/EditBiodata.jsx'
import ViewBiodata from './assets/pages/ViewBiodata.jsx'
import Preview from './assets/pages/Preview.jsx'

function PrivateRoute({ children }) {
  const { user, loading } = useAuth()
  
  if (loading) {
    return <div className="loading-screen">Loading...</div>
  }
  
  return user ? children : <Navigate to="/login" />
}

function PublicRoute({ children }) {
  const { user, loading } = useAuth()
  
  if (loading) {
    return <div className="loading-screen">Loading...</div>
  }
  
  return !user ? children : <Navigate to="/dashboard" />
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Landing />} />
        
        <Route path="login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        
        <Route path="register" element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } />
        
        <Route path="dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
        
        <Route path="create" element={
          <PrivateRoute>
            <CreateBiodata />
          </PrivateRoute>
        } />
        
        <Route path="edit/:id" element={ 
          <PrivateRoute>
            <EditBiodata />
          </PrivateRoute>
        } />
        
        <Route path="preview/:id" element={
          <PrivateRoute>
            <Preview />
          </PrivateRoute>
        } />
        
        <Route path="view/:id" element={<ViewBiodata />} />
      </Route>
    </Routes>
  )
}

export default App
