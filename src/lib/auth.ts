import * as React from 'react'
import { getAuth, onAuthStateChanged, signOut, type User } from 'firebase/auth'

interface AuthContextValue {
  user: User | null
  loading: boolean
  logout: () => Promise<void>
}

const AuthContext = React.createContext<AuthContextValue | null>(null)

AuthContext.displayName = 'AuthContext'

function AuthProvider(props: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const auth = getAuth()
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const logout = React.useCallback(async () => {
    const auth = getAuth()
    await signOut(auth)
  }, [])

  const value = React.useMemo(
    () => ({
      user,
      loading,
      logout,
    }),
    [user, loading, logout]
  )

  return React.createElement(AuthContext.Provider, { value }, props.children)
}

function useAuth() {
  const context = React.useContext(AuthContext)
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export { AuthProvider, useAuth }
