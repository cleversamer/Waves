import DashboardLayout from "hoc/DashboardLayout";
import { useSelector } from "react-redux";
import { selectUserData } from "store/user";

const Dashboard = () => {
  const user = useSelector(selectUserData);

  return (
    <DashboardLayout title="Overview">
      <div className="user_nfo_panel">
        <div>
          <span>{user.firstname || "No firstname added"}</span>
          <span>{user.lastname || "No lastname added"}</span>
          <span>{user.email}</span>
        </div>

        {!!user.history.length && (
          <div className="user_nfo_panel">
            <h1>History of purchases</h1>
            <div className="user_product_block_wrapper">history</div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
