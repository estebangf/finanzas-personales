import { useLocation, Navigate, NavigateProps } from 'react-router-dom'
import useAuth from '../../tools/useAuth'

interface RequireAuthProps {
  children: JSX.Element
  required: boolean
  exclud?: boolean
}
export default function RequireAuth ({ children, required, exclud }: RequireAuthProps) {
  const auth = useAuth()
  const location = useLocation()

  const from = (location.state)?.from?.pathname || '/'
  console.log('from', from)

  if (required) {
    if (auth.user == null) {
      return <Navigate to="/signin" state={{ from: location }} replace />
    } else return children
  } else if (exclud && (auth.user != null)) { return <Navigate to={from} replace /> } else return children
}
