import WavesButton from "components/common/WavesButton";

const SlimPromotion = ({ items }) => {
  const style = {
    background: `url(${items.img})`,
  };
  return (
    <div className="slim_promotion">
      <div className="slim_promotion_img" style={style}>
        <div className="tag title">{items.lineOne}</div>
        <div className="tag low_title">{items.lineTwo}</div>
        <div className="btn">
          <WavesButton
            type="default"
            title={items.linkTitle}
            linkTo={items.linkTo}
          />
        </div>
      </div>
    </div>
  );
};

export default SlimPromotion;
