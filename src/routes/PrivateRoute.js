import { Navigate, Outlet } from "react-router-dom";
function Private({ isLogged })
{
    return isLogged === 'authorize' ? <Outlet /> : <Navigate to="/login" />;
}
export default Private;