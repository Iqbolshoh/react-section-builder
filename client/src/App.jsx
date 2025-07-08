import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'

// Auth Pages
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'

// Admin Pages
import AdminLayout from './layouts/AdminLayout'
import AdminDashboard from './pages/admin/Dashboard'
import Categories from './pages/admin/Categories'
import Sections from './pages/admin/Sections'
import Websites from './pages/admin/Websites'
import Users from './pages/admin/Users'

// User Pages
import UserLayout from './layouts/UserLayout'
import UserDashboard from './pages/user/Dashboard'
import WebsiteBuilder from './pages/user/WebsiteBuilder'
import WebsitePreview from './pages/user/WebsitePreview'

// Other Pages
import NotFound from './pages/NotFound'

function App() {
  const { user, loading } = useAuth()
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={!user ? <Login /> : <Navigate to={user.role === 'admin' ? '/admin' : '/dashboard'} />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to={user.role === 'admin' ? '/admin' : '/dashboard'} />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={user && user.role === 'admin' ? <AdminLayout /> : <Navigate to="/login" />}>
          <Route index element={<AdminDashboard />} />
          <Route path="categories" element={<Categories />} />
          <Route path="sections" element={<Sections />} />
          <Route path="websites" element={<Websites />} />
          <Route path="users" element={<Users />} />
        </Route>
        
        {/* User Routes */}
        <Route path="/" element={user ? <UserLayout /> : <Navigate to="/login" />}>
          <Route index element={<Navigate to="/dashboard" />} />
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="builder/:id" element={<WebsiteBuilder />} />
          <Route path="preview/:id" element={<WebsitePreview />} />
        </Route>
        
        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App