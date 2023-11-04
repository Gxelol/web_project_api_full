import { Redirect } from "react-router-dom";

const ProtectedRoute = ({ children, loggedIn }) => {
  return loggedIn ? children : <Redirect to={"/signin"} />
}

export default ProtectedRoute;