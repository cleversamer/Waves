/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import * as fetch from "services/fetch";
import config from "config.json";

const CartProduct = ({ product, onRemove, addTotal }) => {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch.fetchProductById(
      product,
      (res) => {
        setData(res.data);
      },
      (err) => {}
    );
  }, []);

  useEffect(() => {
    addTotal(data.price || 0);
  }, [data, product]);

  const handleRemove = () => {
    onRemove(product, data.price);
  };

  const renderCardImage = (images) => {
    if (images?.length > 0) {
      return images[0];
    } else {
      return config.paths.notAvailableImage;
    }
  };

  return (
    <div className="user_product_block">
      <div className="item">
        <div
          className="image"
          style={{
            background: `url(${renderCardImage(data?.images)}) no-repeat`,
          }}
        ></div>
      </div>
      <div className="item">
        <h4>{data?.model || "***"}</h4>
        <div>
          <span style={{ textTransform: "capitalize" }}>
            {data?.brand?.name || "***"}
          </span>{" "}
          <span>{data?.model || "***"}</span>
        </div>
      </div>
      <div className="item">
        <h4>Price</h4>
        <div>${data?.price || 0}</div>
      </div>
      <div className="item btn">
        <div className="cart_remove_btn" onClick={handleRemove}>
          Remove
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
