import {
    Navigate,
    Outlet,
    useLocation
  } from 'react-router-dom';
  
  const ProtectedRoute = ({
    user,
    redirectPath = '/',
    children,
  }) => {
    const location = useLocation()

    if (!user) {
      return <Navigate to={redirectPath}  state={{ from: location }} replace />;
    }
  
    return children ? children : <Outlet />;
  };

  export default ProtectedRoute