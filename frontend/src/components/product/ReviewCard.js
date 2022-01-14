import React from 'react';
import ReactStars from "react-rating-stars-component";
import profilePng from "../../images/Profile.png";

const ReviewCard = ({review}) => {
    // options for rating stars
  const options = {
    edit: false,
    activeColor: "tomato",
    value: review.rating,
    isHalf: true,
    size: window.innerWidth < 600 ? 20 : 25,
  };
    return (
        <div className="reviewCard">
            <img src={profilePng} alt="user" />
            <p>{review.name}</p>
            <ReactStars {...options} />
            <span>{review.comment}</span>
        </div>
    )
}

export default ReviewCard
