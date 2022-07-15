import Featured from "components/home/Featured";
import SlimPromotion from "components/promotions/SlimPromotion";

const Home = () => {
  const slimPromotion = {
    img: "/assets/images/featured/featured_home_3.jpg",
    lineOne: "Up to 40% off",
    lineTwo: "In second hand guitar",
    linkTitle: "Show Now",
    linkTo: "/shop",
  };

  return (
    <div>
      <Featured />
      <SlimPromotion items={slimPromotion} />
    </div>
  );
};

export default Home;
