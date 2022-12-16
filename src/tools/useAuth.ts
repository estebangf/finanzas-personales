import { useContext } from 'react'
import { AuthContext, AuthContextType } from '../features/AuthProvider'

const useAuth = (): AuthContextType => useContext(AuthContext)

export default useAuth
