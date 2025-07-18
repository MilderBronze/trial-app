import React, { useState, useEffect } from "react";
import { getAverageRating } from "../../../../services/operations/courseAPI";
import { useDispatch, useSelector } from "react-redux";
import { GiNinjaStar } from "react-icons/gi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { removeFromCart } from "../../../../slices/cartSlice";
import ReactStars from "react-rating-stars-component";

const RenderCartCourses = () => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [averageRatings, setAverageRatings] = useState({});
  useEffect(() => {
    const fetchAverageRatings = async () => {
      const ratings = {};

      for (let course of cart) {
        const avgRating = await getAverageRating(course._id);
        ratings[course._id] = avgRating;
        // this is a lookup object which we are building
      }

      setAverageRatings(ratings);
    };

    if (cart.length > 0) {
      fetchAverageRatings();
    }
  }, [cart]);

  return (
    <div>
      {cart.map((course) => (
        <div key={course._id}>
          <div>
            <img src={course?.thumbnail} alt="" />
            <div>
              <p>{course?.courseName}</p>
              <p>{course?.category?.name}</p>
              <div>
                <span>
                  {/* mai below code ko console kr kr ke likhta.. since abhi console nai kr skte.. tab tak jab
                    tak hamare pas courses ready nai hai.. and uske liye we will need to sign up as an instructor and create some courses to sell to the students */}
                  {averageRatings[course._id]
                    ? Number(averageRatings[course._id]).toFixed(1)
                    : // to fixed ko use kiye to format the rating to one decimal place (e.g., 4.3333 → 4.3),

                      "..."}{" "}
                  / 5
                </span>
                <ReactStars
                  value={Number(averageRatings[course._id]) || 0}
                  count={5}
                  size={20}
                  edit={false}
                  activeColor="#ffd700"
                  emptyIcon={<GiNinjaStar />}
                  fullIcon={<GiNinjaStar />}
                />

                <span>{course?.ratingAndReviews?.length || 0} Ratings</span>
              </div>
            </div>
          </div>

          <div>
            <button onClick={() => dispatch(removeFromCart(course._id))}>
              <RiDeleteBin6Line />
              <span>Remove</span>
            </button>

            <p>Rs {course?.price} </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RenderCartCourses;
