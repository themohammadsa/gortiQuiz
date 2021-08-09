import { Route, Navigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthProvider";

export function PrivateRoute({ path, ...props }: any) {
    const { token } = useAuthContext();

    return token ? (
        <Route {...props} path={path} />
    ) : (
        <Navigate state={{ from: path }} replace to="/login" />
    );
}