/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  addProductsByDate,
  selectProductsByDate,
  addProductsBySold,
  selectProductsBySold,
} from "store/products";

import Loader from "components/common/Loader";
import Featured from "components/home/Featured";
import SlimPromotion from "components/promotions/SlimPromotion";
import CardBlock from "components/home/CardBlock";

import config from "config.json";
import * as fetch from "services/fetch";
import * as toast from "services/toast";

const Home = () => {
  const dispatch = useDispatch();
  const producutsBySold = useSelector(selectProductsBySold());
  const producutsByDate = useSelector(selectProductsByDate());

  useEffect(() => {
    fetch.fetchProductsByDate(
      (res) => {
        dispatch(addProductsByDate(res.data));
      },
      (err) => {
        toast.showError(`${err.message}: ${config.errors.fetch.products}`);
      }
    );

    fetch.fetchProductsBySold(
      (res) => {
        dispatch(addProductsBySold(res.data));
      },
      (err) => {
        toast.showError(`${err.message}: ${config.errors.fetch.products}`);
      }
    );
  }, []);

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

      {producutsBySold ? (
        <CardBlock items={producutsBySold} title="Best selling guitars" />
      ) : (
        <Loader />
      )}

      <SlimPromotion items={slimPromotion} />

      {producutsByDate ? (
        <CardBlock
          items={producutsByDate}
          title="Latests guitars on the shop"
        />
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Home;
