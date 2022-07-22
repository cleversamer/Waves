/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import CardBlock from "components/home/CardBlock";
import SearchBar from "components/dashboard/SearchBar";
import CollapseCheckbox from "components/dashboard/CollapseCheckbox";
import RangeSelect from "components/dashboard/RangeSelect";

import { useDispatch, useSelector } from "react-redux";
import { selectBrands, addBrands } from "store/brands";
import { selectProductsByDate, addProductsByDate } from "store/products";

import * as fetch from "services/fetch";
import * as toast from "services/toast";
import config from "config.json";

const Shop = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProductsByDate());
  const brands = useSelector(selectBrands);
  const [queryParams, setQueryParams] = useState({
    skip: 0,
    limit: 0,
    sortBy: "date",
    order: "desc",
  });

  useEffect(() => {
    fetch.fetchAllBrands(
      (res) => {
        dispatch(addBrands(res.data));
      },
      (err) => {
        toast.showError(config.errors.fetch.brands);
      }
    );

    fetch.fetchPaginatedProducts(
      queryParams,
      (res) => {
        dispatch(addProductsByDate(res.data));
      },
      (err) => {
        toast.showError(config.errors.fetch.products);
      }
    );
  }, []);

  return (
    <div className="page_container">
      <div className="container">
        <div className="shop_wrapper">
          <div className="left">
            <CollapseCheckbox
              initState={false}
              title="Brands"
              list={brands}
              //   handleFilters={(filters) => handleFilters(filters, "brands")}
            />

            <CollapseCheckbox
              initState={false}
              title="Frets"
              list={[
                { _id: 20, name: 20 },
                { _id: 21, name: 21 },
                { _id: 22, name: 22 },
                { _id: 24, name: 24 },
              ]}
              //   handleFilters={(filters) => handleFilters(filters, "frets")}
            />

            <RangeSelect
              title="Price range"
              //   handleRange={(values) => handleRange(values)}
            />
          </div>

          <div className="right">
            <div className="shop_options">
              <CardBlock items={products} shop={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
