import { Navigate } from "react-router-dom";
import useReduxSelector from "hooks/useReduxSelector";
import Paths from "router/paths";
import { selectUser } from "features/auth/authSlice";
import User from "types/user";

export default function AuthRoute({ children }: { children: JSX.Element }) {
  const user: User | null = useReduxSelector(selectUser);

  if (user) {
    return <Navigate to={Paths.HOME} replace />;
  }

  return children;
}
