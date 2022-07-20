import { useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "hoc/DashboardLayout";
import Loader from "components/common/Loader";
import EditProfile from "components/dashboard/EditProfile";
import EditEmail from "components/dashboard/EditEmail";

import { useDispatch, useSelector } from "react-redux";
import { selectUserData, updateUserProfile, updateUserEmail } from "store/user";

import * as userService from "services/user";
import * as toast from "services/toast";
import config from "config.json";

const UserInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUserData);
  const [isLoading, setLoading] = useState(false);

  const onEditProfile = (values) => {
    setLoading(true);

    userService.updateUserProfile(
      values,
      (res) => {
        dispatch(updateUserProfile(values));
        navigate(config.routes.dashboard);
        toast.showSuccess(config.messages.profileUpdated);
      },
      (err) => {
        console.log(err);
        const message = err.response.data
          ? err.response.data.message
          : err.message;
        toast.showError(message);
      },
      () => {
        setLoading(false);
      }
    );
  };

  const onEditEmail = (values) => {
    setLoading(true);

    userService.updateUserEmail(
      values,
      (res) => {
        dispatch(updateUserEmail(values));
        navigate(config.routes.dashboard);
        toast.showSuccess(config.messages.emailUpdated);
      },
      (err) => {
        console.log(err);
        const message = err.response.data
          ? err.response.data.message
          : err.message;
        toast.showError(message);
      },
      () => {
        setLoading(false);
      }
    );
  };

  return (
    <DashboardLayout title="User information">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <EditProfile user={user} onSubmit={onEditProfile} />
          <hr />
          <EditEmail user={user} onSubmit={onEditEmail} />
        </>
      )}
    </DashboardLayout>
  );
};

export default UserInfo;
