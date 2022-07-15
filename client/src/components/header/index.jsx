import { Link } from "react-router-dom";
import config from "config.json";

const Header = () => {
  const handleLogout = (e) => {
    alert("log out");
  };

  return (
    <header className="bck_b_light">
      <div className="container header-container">
        <div className="left">
          <div className="logo">WAVES</div>
        </div>

        <div className="right">
          <div className="top">
            <>
              <div className="cart_link">
                <span>1</span>
                <Link to={config.routes.cart}>My cart</Link>
              </div>

              <Link to={config.routes.dashboard}>My account</Link>

              <Link to={config.routes.home} className="log_out_link">
                <span onClick={handleLogout}>Log out</span>
              </Link>

              <Link to={config.routes.login}>Log in</Link>
            </>
          </div>

          <div className="bottom">
            <Link to={config.routes.home}>Home</Link>
            <Link to={config.routes.shop}>Shop</Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
