import Card from "./Card";

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
        <div className="home-cards-container">{renderCards()}</div>
      </div>
    </div>
  );
};

export default CardBlock;
