import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { getProducts , clearErrors} from "../../actions/productAction";
import "./Products.css";
import ProductCard from "../Home/ProductCard";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";

const categories = [
  "Laptop",
  "Phones",
  "Shoes",
  "Clothes",
  "Bikes",
  "watches"
]


const Products = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const [currentPage, setcurrentPage] = useState(1);
  const [price, setprice] = useState([0, 50000]);
  const [category, setCategory] = useState();
  const [ratings, setRatings] = useState(0);

  const setCurrentPageNo = (e) => {
    setcurrentPage(e);
  };

  const priceHandler = (e, newPrice) => {
    setprice(newPrice);
  };

  const {
    products,
    loading,
    error,
    productsCount,
    resultperPage,
    // filteredProductsCount,
  } = useSelector((state) => state.products);

  const keyword = match.params.keyword;

  useEffect(() => {
    if(error){
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProducts(keyword, currentPage, price,category,ratings));
  }, [dispatch, keyword, error, currentPage, price,category,ratings,alert]);

  // let count = filteredProductsCount;

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="PRODUCTS -- AQUAFRESH" />
          <h2 className="productsHeading">Products</h2>
          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

          {/* Creating filters */}
          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              min={0}
              max={50000}
              onChange={priceHandler}
              aria-labelledby="range-slider"
              valueLabelDisplay="auto"
            />

            {/* Creating Category filter */}
            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) =>
               (<li
                className="category-link"
                key={category}
                onClick={() => setCategory(category)}
              >
                {category}
              </li>))}
            </ul>

            {/* Creating Ratings Filter */}
            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider 
              value={ratings}
              onChange = {(e,newRating) => setRatings(newRating)}
              aria-labelledby="continuous-slider"
              min = {0}
              max = {5}
              valueLabelDisplay="auto" />
            </fieldset>
          </div>

          {/* //Creating Pagination */}
          {resultperPage < productsCount && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultperPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
