/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Loader from "components/common/Loader";
import ProductInfo from "components/product/ProductInfo";

import * as fetch from "services/fetch";
import * as toast from "services/toast";
import config from "config.json";

const ProductDetail = (props) => {
  const params = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    fetch.fetchProductById(
      params.id,
      (res) => {
        setProduct(res.data);
      },
      (err) => toast.showError(err.response.data.message)
    );
  }, []);

  const renderCardImage = (images) => {
    return images?.length > 0 ? images[0] : config.paths.notAvailableImage;
  };

  return (
    <div className="page_container">
      <div className="page_top">
        <div className="container">Product detail</div>
      </div>

      <div className="container">
        {product ? (
          <div className="product_detail_wrapper">
            <div className="left">
              <div>
                <img
                  style={{ boxSizing: "border-box" }}
                  alt="some alt"
                  src={renderCardImage(product.images)}
                  onClick={() => alert("show carrousel")}
                ></img>
              </div>
            </div>

            <div className="right">
              <ProductInfo detail={product} />
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
