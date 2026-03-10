import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('shaadibio_user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    // Simulated login - in real app would call API
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          const user = {
            id: Date.now(),
            name: email.split('@')[0],
            email
          }
          setUser(user)
          localStorage.setItem('shaadibio_user', JSON.stringify(user))
          resolve(user)
        } else {
          reject(new Error('Invalid credentials'))
        }
      }, 800)
    })
  }

  const register = async (name, email, password) => {
    // Simulated registration
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (name && email && password) {
          const user = {
            id: Date.now(),
            name,
            email
          }
          setUser(user)
          localStorage.setItem('shaadibio_user', JSON.stringify(user))
          resolve(user)
        } else {
          reject(new Error('Registration failed'))
        }
      }, 800)
    })
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('shaadibio_user')
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
