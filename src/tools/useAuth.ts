import { useContext } from "react";
import { AuthContext } from "../features/AuthProvider";

const useAuth = () => useContext(AuthContext);

export default useAuth;