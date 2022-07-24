import CartProduct from "./CartProduct";

const CardDetail = ({ cart, removeItem, addTotal }) => {
  const renderItems = () => {
    return cart.map((product, index) => (
      <CartProduct
        key={product + index}
        addTotal={addTotal}
        product={product}
        onRemove={removeItem}
      />
    ));
  };

  return <div>{renderItems()}</div>;
};

export default CardDetail;
