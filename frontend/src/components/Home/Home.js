import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/all";
import "./Home.css";
import Product from "./ProductCard.js";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { getProducts,clearErrors } from "../../actions/productAction";
import { useDispatch, useSelector } from "react-redux";

//To use alertTemplate
import { useAlert } from "react-alert";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
       dispatch(clearErrors())
    }
    dispatch(getProducts());
  }, [dispatch, error,alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="AquaFresh" />
          <div className="banner">
            <p>Welcome to Aquafresh</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Products</h2>
          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
