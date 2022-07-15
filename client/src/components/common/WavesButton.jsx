const { Link } = require("react-router-dom");

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

      default:
        return null;
    }
  };

  return renderTemplate();
};

export default WavesButton;
