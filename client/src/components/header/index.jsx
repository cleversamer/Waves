import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUserAuth, selectUserCart, logoutUser } from "store/user";
import * as auth from "services/auth";
import * as toast from "services/toast";
import config from "config.json";

const Header = () => {
  const dispatch = useDispatch();
  const userAuth = useSelector(selectUserAuth);
  const cart = useSelector(selectUserCart);

  const handleLogout = () => {
    dispatch(logoutUser());
    auth.removeCookie();
    toast.showSuccess(config.messages.logout);
  };

  return (
    <header className="bck_b_light">
      <div className="container header-container">
        <div className="left">
          <div className="logo">WAVES</div>
        </div>

        <div className="right">
          <div className="top">
            {userAuth ? (
              <>
                <div className="cart_link">
                  <span>{cart?.length || 0}</span>
                  <Link to={config.routes.cart}>cart</Link>
                </div>

                <Link to={config.routes.dashboard}>Dashboard</Link>

                <Link to={config.routes.home} className="log_out_link">
                  <span onClick={handleLogout}>Log out</span>
                </Link>
              </>
            ) : (
              <>
                <Link to={config.routes.register}>Register</Link>
                <Link to={config.routes.login}>Log in</Link>
              </>
            )}
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
