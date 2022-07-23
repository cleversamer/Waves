import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, selectUserAuth } from "store/user";

import WavesButton from "components/common/WavesButton";
import * as toast from "services/toast";
import config from "config.json";

const Card = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userAuth = useSelector(selectUserAuth);

  const renderCardImage = (images) => {
    if (images.length > 0) {
      return images[0];
    } else {
      return config.paths.notAvailableImage;
    }
  };

  const handleAddToCart = (item) => {
    if (userAuth) {
      dispatch(addItemToCart(item));
      toast.showSuccess(config.messages.itemAddedToCart);
    } else {
      navigate(config.routes.login);
      toast.showError(config.errors.auth.itemAddedToCart);
    }
  };

  return (
    <div className={`card_item_wrapper ${props.grid ? "grid_bars" : ""}`}>
      <div
        className="image"
        style={{
          background: `url(${renderCardImage(props.item.images)})`,
        }}
      ></div>
      <div className="action_container">
        <div className="tags">
          <div className="brand">{props.item.brand.name}</div>
          <div className="name">{props.item.model}</div>
          <div className="name">${props.item.price}</div>
        </div>

        {props.grid ? (
          <div className="description">
            <p>{props.item.description}</p>
          </div>
        ) : null}

        <div className="actions">
          <div className="button_wrapp">
            <WavesButton
              type="default"
              altClass="card_link"
              title="View product"
              linkTo={`${config.routes.productDetails}/${props.item._id}`}
              style={{
                fontWeight: "bold",
              }}
            />
          </div>
          <div className="button_wrapp">
            <WavesButton
              type="bag_link"
              runAction={() => handleAddToCart(props.item)}
              iconSize="23"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
