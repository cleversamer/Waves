import { Link } from "react-router-dom";
import config from "../../config.json";
import "./index.css";

const NotFound = () => {
  return (
    <div className="container">
      <h1 className="heading">
        The requested URL was not found on this server.
      </h1>

      <Link to={config.routes.home}>Back to the home page</Link>
    </div>
  );
};

export default NotFound;
