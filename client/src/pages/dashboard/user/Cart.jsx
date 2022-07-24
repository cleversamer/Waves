import { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { selectUserData, removeCartItem } from "store/user";

import DashboardLayout from "hoc/DashboardLayout";
import CartDetail from "components/dashboard/CartDetail";

import * as userService from "services/user";
import * as toast from "services/toast";

const UserCart = () => {
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  const user = useSelector(selectUserData);

  const removeItem = (productId, price) => {
    userService.removeCartItem(
      productId,
      (res) => {
        dispatch(removeCartItem(productId));
        setTotal(total - price);
      },
      (err) => {
        toast.showError(err.response.data.message);
      }
    );
  };

  const addProductPriceToTotal = (price) => {
    setTotal(total + price);
  };

  return (
    <DashboardLayout title="Your Cart">
      {user.cart && user.cart.length > 0 ? (
        <>
          <CartDetail
            cart={user.cart}
            addTotal={addProductPriceToTotal}
            removeItem={removeItem}
          />

          <div className="user_cart_sum">
            <div>Total amount: ${total}</div>
          </div>
        </>
      ) : (
        <div>There is nothing in your cart</div>
      )}
    </DashboardLayout>
  );
};

export default UserCart;
