/** @jsxImportSource react */

import React from 'react'
import { User } from 'firebase/auth'

interface AuthContextType {
  isAuthenticated: boolean
  user: User | null
  loading: boolean
}

const TestAuthContext = React.createContext<AuthContextType | undefined>(undefined)

export function TestAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = React.useState(false)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    setLoading(false)
  }, [])

  const value = React.useMemo(() => ({
    isAuthenticated,
    user,
    loading
  }), [isAuthenticated, user, loading])

  return (
    <TestAuthContext.Provider value={value}>
      {children}
    </TestAuthContext.Provider>
  )
}

export function useTestAuth() {
  const context = React.useContext(TestAuthContext)
  if (context === undefined) {
    throw new Error('useTestAuth must be used within a TestAuthProvider')
  }
  return context
}
