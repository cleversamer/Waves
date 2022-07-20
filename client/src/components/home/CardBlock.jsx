import Card from "./Card";
import Loader from "components/common/Loader";

const CardBlock = ({ items, title, shop, grid }) => {
  const renderCards = () => {
    return items?.map((item) => (
      <Card key={item._id} item={item} grid={grid} />
    ));
  };

  return (
    <div className={shop ? "card_block_shop" : "card_block"}>
      <div className={shop ? "" : "container"}>
        {title ? <div className="title">{title}</div> : null}
        {items?.length ? (
          <div className="home-cards-container">{renderCards()}</div>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default CardBlock;
