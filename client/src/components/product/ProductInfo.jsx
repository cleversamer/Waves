import { useSelector } from "react-redux";
import { selectBrandById } from "store/brands";

import { LocalShipping, DoneOutline } from "@material-ui/icons";
import WavesButton from "components/common/WavesButton";

const ProductInfo = (props) => {
  const brand = useSelector(selectBrandById(props.detail.brand));

  const showProdTags = (detail) => (
    <div className="product_tags">
      <div className="tag">
        <div>
          <LocalShipping />
        </div>
        <div className="tag_text">
          {detail.shipping ? (
            <div>Free shipping for US location</div>
          ) : (
            <div>No free shipping for this item</div>
          )}
        </div>
      </div>
      {detail.available > 0 ? (
        <div className="tag">
          <div>
            <DoneOutline />
          </div>
          <div className="tag_text">
            <div>
              <strong>{detail.available}</strong> product/s in wharehouse
              available.
            </div>
          </div>
        </div>
      ) : (
        <div className="tag">
          <div>
            <DoneOutline />
          </div>
          <div className="tag_text">
            <div>Sorry, product not Available at the moment</div>
          </div>
        </div>
      )}
    </div>
  );

  const showProdActions = (detail) => (
    <div className="product_actions">
      <div className="price">$ {detail.price}</div>
      <div className="cart">
        <WavesButton
          type="add_to_cart_link"
          runAction={() => alert("added to cart")}
        />
      </div>
    </div>
  );

  const showProdSpecs = (detail) => (
    <div className="product_specifications">
      <h2>Specs:</h2>
      <div>
        <div className="item">
          <strong>Frets:</strong> {detail.frets}
        </div>
        <div className="item">
          <strong>Wood:</strong> {detail.woodtype}
        </div>
      </div>
    </div>
  );

  const detail = props.detail;
  return (
    <div>
      <h1>
        <span style={{ textTransform: "capitalize" }}>{brand?.name}</span>{" "}
        <span>{detail.model}</span>
      </h1>

      <p>{detail.description}</p>
      {showProdTags(detail)}
      {showProdActions(detail)}
      {showProdSpecs(detail)}
    </div>
  );
};

export default ProductInfo;
