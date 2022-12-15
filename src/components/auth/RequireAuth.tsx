import { useLocation, Navigate, NavigateProps } from "react-router-dom";
import useAuth from "../../tools/useAuth";

interface RequireAuthProps {
  children: JSX.Element
  required: boolean
  exclud?: boolean
}
export default function RequireAuth({ children, required, exclud }: RequireAuthProps) {
  let auth = useAuth();
  let location = useLocation();
  
  let from = (location.state as any)?.from?.pathname || "/";
  console.log("from",from)

  if (required)
    if (!auth.user) {
      return <Navigate to="/signin" state={{ from: location }} replace />;
    } else return children;
  else if (exclud && auth.user)
    return <Navigate to={from} replace />;
  else return children;
}
