import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token')
    
    if (token) {
      axios.defaults.headers.common['x-auth-token'] = token
      fetchUser()
    } else {
      setLoading(false)
    }
  }, [])

  const fetchUser = async () => {
    try {
      const res = await axios.get('/api/auth/me')
      setUser(res.data)
    } catch (err) {
      console.error('Error fetching user:', err)
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['x-auth-token']
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    try {
      const res = await axios.post('/api/auth/login', { email, password })
      localStorage.setItem('token', res.data.token)
      axios.defaults.headers.common['x-auth-token'] = res.data.token
      setUser(res.data.user)
      return res.data.user
    } catch (err) {
      throw err.response?.data?.message || 'Login failed'
    }
  }

  const register = async (name, email, password) => {
    try {
      const res = await axios.post('/api/auth/register', { name, email, password })
      localStorage.setItem('token', res.data.token)
      axios.defaults.headers.common['x-auth-token'] = res.data.token
      setUser(res.data.user)
      return res.data.user
    } catch (err) {
      throw err.response?.data?.message || 'Registration failed'
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    delete axios.defaults.headers.common['x-auth-token']
    setUser(null)
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}