import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserData } from "store/user";
import config from "config.json";

export const userLinks = [
  {
    name: "Account",
    linkTo: config.routes.dashboard,
  },
  {
    name: "Information",
    linkTo: config.routes.userInfo,
  },
  {
    name: "Shopping cart",
    linkTo: config.routes.cart,
  },
];

export const adminLinks = [
  {
    name: "Products",
    linkTo: config.routes.admin.products,
  },
  {
    name: "Manage site",
    linkTo: config.routes.admin.manageSite,
  },
];

const DashboardLayout = (props) => {
  const user = useSelector(selectUserData);

  const renderLinks = (data) =>
    data.map((item, i) => (
      <Link to={item.linkTo} key={`${item.name}${i}`}>
        {item.name}
      </Link>
    ));

  return (
    <div className="container">
      <div className="user_container page_container">
        <div className="user_left_nav">
          <h2>Dashboard</h2>

          <div className="links">{renderLinks(userLinks)}</div>

          {user.role === "admin" && (
            <div>
              <h2>Admin</h2>
              <div className="links">{renderLinks(adminLinks)}</div>
            </div>
          )}
        </div>

        <div className="user_right">
          <div className="dashboard_title">
            <h1>{props.title}</h1>
          </div>

          {props.children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
