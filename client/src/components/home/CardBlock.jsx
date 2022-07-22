import Card from "./Card";
import Loader from "components/common/Loader";
import config from "config.json";

const CardBlock = ({ loading, items, title, shop, grid }) => {
  const renderCards = () => {
    return items?.map((item) => (
      <Card key={item._id} item={item} grid={grid} />
    ));
  };

  return (
    <div className={shop ? "card_block_shop" : "card_block"}>
      <div className={shop ? "" : "container"}>
        {title ? <div className="title">{title}</div> : null}
        {loading ? (
          <Loader />
        ) : items.length ? (
          <div className="home-cards-container">{renderCards()}</div>
        ) : (
          <p
            style={{
              display: "grid",
              placeContent: "center",
              height: "40vh",
              color: "#303030",
            }}
          >
            <span>{config.errors.fetch.products}</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default CardBlock;
