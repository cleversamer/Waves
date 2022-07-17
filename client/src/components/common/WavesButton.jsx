import { Link } from "react-router-dom";
import { AddShoppingCart } from "@material-ui/icons";

const WavesButton = (props) => {
  const renderTemplate = () => {
    switch (props.type) {
      case "default":
        return (
          <Link
            className={!props.altClass ? "link_default" : props.altClass}
            to={props.linkTo}
            style={{
              ...props.style,
            }}
          >
            {props.title}
          </Link>
        );

      case "bag_link":
        return (
          <div
            className="bag_link"
            onClick={() => {
              props.runAction();
            }}
            style={{ ...props.style }}
          >
            <AddShoppingCart style={{ fontSize: props.iconSize }} />
          </div>
        );

      default:
        return null;
    }
  };

  return renderTemplate();
};

export default WavesButton;
