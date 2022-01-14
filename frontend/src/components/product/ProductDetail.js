import React, { Fragment, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetail.css";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProductDetail } from "../../actions/productAction";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard.js";
import Loader from "../layout/Loader/Loader";
import {useAlert} from "react-alert";
import MetaData from "../layout/MetaData";

const ProductDetail = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { product, loading, error } = useSelector(
    (state) => state.productDetail
  );

  useEffect(() => {
    if(error){
       alert.error(error);
       dispatch(clearErrors())
    }
    dispatch(getProductDetail(match.params.id));
  }, [dispatch, match.params.id,alert,error]);

  // options for rating stars
  const options = {
    edit: false,
    activeColor: "tomato",
    value: product.ratings,
    isHalf: true,
    size: window.innerWidth < 600 ? 20 : 25,
  };
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${product.name} -- AQUAFRESH`} ></MetaData>
          <div className="productDetail">
            {/* Product Image */}
            <div>
              <Carousel>
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={item.url}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>

            {/* Product details */}
            <div>
              <div className="detailBlock-1">
                <h2>{product.name}</h2>
                <p>Product #{product._id}</p>
              </div>
              <div className="detailBlock-2">
                <ReactStars {...options} />
                <span>({product.numOfReviews} Review)</span>
              </div>
              <div className="detailBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailBlock-3-1">
                  <div className="detailBlock-3-1-1">
                    <button>-</button>
                    <input value="1" type="number" />
                    <button>+</button>
                  </div>
                  <button>Add to Cart</button>
                </div>
                <p>
                  Status:{" "}
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutofStock" : "InStock"}
                  </b>
                </p>
              </div>
              <div className="detailBlock-4">
                Description: <p>{product.description}</p>
              </div>

              <button className="submitReview">Submit Review</button>
            </div>
          </div>

          <h3 className="reviewsHeading">REVIEWS</h3>
          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => <ReviewCard review={review} />)}
            </div>
          ) : (
            <p className="noReviews"> NO REVIEWS YET</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetail;
