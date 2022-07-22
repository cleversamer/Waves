/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import CardBlock from "components/home/CardBlock";
import CollapseCheckbox from "components/dashboard/CollapseCheckbox";
import RangeSelect from "components/dashboard/RangeSelect";
import { Button } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { selectBrands, addBrands } from "store/brands";
import {
  selectPaginatedProducts,
  addPaginatedProducts,
  deleteProducts,
} from "store/products";

import * as fetch from "services/fetch";
import * as toast from "services/toast";
import config from "config.json";

const defaultFilter = {
  selectedBrands: "",
  selectedFrets: "",
  minPrice: 0,
  maxPrice: 5000,
};

const defaultPagination = {
  skip: 0,
  // limit: config.query.products.paginated.defaultLimit,
  limit: 0,
  sortBy: "date",
  order: "desc",
};

const Shop = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectPaginatedProducts());
  const [loading, setLoading] = useState(false);
  const brands = useSelector(selectBrands);
  const [filter, setFilter] = useState(defaultFilter);
  const [pagination, setPagination] = useState(defaultPagination);

  useEffect(() => {
    fetch.fetchAllBrands(
      (res) => {
        dispatch(addBrands(res.data));
      },
      (err) => {
        toast.showError(config.errors.fetch.brands);
      }
    );
  }, []);

  useEffect(() => {
    setLoading(true);

    fetch.fetchPaginatedProducts(
      pagination,
      filter,
      (res) => {
        dispatch(addPaginatedProducts(res.data));
      },
      (err) => {
        const message =
          err.response.data.message || config.errors.fetch.products;
        toast.showError(message);
        dispatch(deleteProducts("paginated"));
      },
      () => {
        setLoading(false);
      }
    );
  }, [pagination, filter]);

  const handleBrandsFilter = (values) => {
    setFilter({ ...filter, selectedBrands: values.join(",") });
  };

  const handleFretsFilter = (values) => {
    setFilter({
      ...filter,
      selectedFrets: values.map((value) => value.toString()).join(","),
    });
  };

  const handlePriceFilter = (values) => {
    setFilter({
      ...filter,
      minPrice: values[0],
      maxPrice: values[1],
    });
  };

  const handlePrev = () => {
    const { defaultLimit } = config.query.products.paginated;
    const currentLimit = pagination.limit;
    if (currentLimit === defaultLimit) {
      return;
    }

    setPagination({
      ...pagination,
      limit: currentLimit - defaultLimit,
    });
  };

  const handleNext = () => {
    const { defaultLimit } = config.query.products.paginated;
    const currentLimit = pagination.limit;
    if (!products.length) {
      return;
    }

    setPagination({
      ...pagination,
      limit: currentLimit - defaultLimit,
    });
  };

  return (
    <div className="page_container">
      <div className="container">
        <div className="shop_wrapper">
          <div className="left">
            <CollapseCheckbox
              initState={false}
              title="Brands"
              list={brands}
              handleFilters={(values) => handleBrandsFilter(values)}
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
              handleFilters={(values) => handleFretsFilter(values)}
            />

            <RangeSelect
              title="Price range"
              handleRange={(values) => handlePriceFilter(values)}
            />
          </div>

          <div className="right">
            <div className="shop_options">
              <CardBlock loading={loading} items={products} shop={true} />
              {/* {!!products.length && (
                <div className="shop-pagination-buttons">
                  <Button
                    size="large"
                    variant="contained"
                    color="secondary"
                    style={{ width: "120px" }}
                    onClick={() => handlePrev()}
                  >
                    Prev
                  </Button>

                  <Button
                    size="large"
                    variant="contained"
                    color="secondary"
                    style={{ width: "120px" }}
                    onClick={() => handleNext()}
                  >
                    Next
                  </Button>
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
