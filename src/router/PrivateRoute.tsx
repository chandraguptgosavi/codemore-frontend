import { Navigate, useLocation } from "react-router-dom";

import { selectUser } from "features/auth/authSlice";
import useReduxSelector from "hooks/useReduxSelector";
import Paths from "./paths";
import User from "types/user";

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const user: User | null = useReduxSelector(selectUser);
  const location = useLocation();

  if (!user) {
    return <Navigate to={Paths.SIGNIN} state={{ from: location }} replace />;
  }
  return children;
}
