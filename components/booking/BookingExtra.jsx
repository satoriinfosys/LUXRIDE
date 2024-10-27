"use client";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import SideBar from "./SideBar";
import { activeInputFocus } from "@/utlis/activeInputFocus";
import Link from "next/link";
import { rideSummaryState } from "@/app/_state/states";

const quantityItem = [
  {
    id: 1,
    name: "Child Seat",
    price: 12,
    description:
      "Suitable for toddlers weighing 0-18 kg (approx 0 to 4 years).",
    quantity: 1,
  },
];

export default function BookingExtra() {
  const [quantityItems, setquantityItems] = useState(quantityItem);
  const [bookingData, setBookingData] = useRecoilState(rideSummaryState);

  const handleQuantity = (qty, i) => {
    if (qty) {
      setBookingData((prevState) => ({
        ...prevState,
        babySeatingCapacity: prevState.babySeatingCapacity + 1,
      }));
    } else {
      setBookingData((prevState) => ({
        ...prevState,
        babySeatingCapacity: Math.max(prevState.babySeatingCapacity - 1, 0),
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBookingData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  useEffect(() => {
    activeInputFocus();
  }, []);

  return (
    <div className="box-row-tab mt-50">
      <div className="box-tab-left">
        <div className="box-content-detail">
          <h3 className="heading-24-medium color-text mb-30 wow fadeInUp">
            Extra Options
          </h3>
          <div className="form-contact form-comment wow fadeInUp">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group">
                    <label className="form-label" htmlFor="flight">
                      Flight/train number
                    </label>
                    <input
                      className="form-control"
                      id="flight"
                      type="text"
                      defaultValue="Example : LH83822"
                      name="flight"
                      value={bookingData.flight}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {/* New fields */}
                <div className="col-lg-6">
                  <div className="form-group">
                    <label className="form-label sticky">
                      Return Date
                    </label>
                    <input
                      className="form-control"
                      id="returnDate"
                      type="date"
                      name="returnDate"
                      value={bookingData.returnDate}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="dropOffLocation">
                      Drop-off Location
                    </label>
                    <input
                      className="form-control"
                      id="dropOffLocation"
                      type="text"
                      name="dropOffLocation"
                      value={bookingData.dropOffLocation}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label className="form-label sticky" htmlFor="dropOffDate">
                      Drop-off Date
                    </label>
                    <input
                      className="form-control"
                      id="dropOffDate"
                      type="date"
                      name="dropOffDate"
                      value={bookingData.dropOffDate}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label className="form-label sticky" htmlFor="dropOffTime">
                      Drop-off Time
                    </label>
                    <input
                      className="form-control"
                      id="dropOffTime"
                      type="time"
                      name="dropOffTime"
                      value={bookingData.dropOffTime}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>




                <div className="col-lg-6">
                  <div className="form-group form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="meetAndGreet"
                      name="meetAndGreet"
                      checked={bookingData.meetAndGreet}
                      onChange={handleInputChange}
                    />
                    <label className="form-check-label" htmlFor="meetAndGreet">
                      Meet and Greet
                    </label>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-group form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="smoking"
                      name="smoking"
                      checked={bookingData.smoking}
                      onChange={handleInputChange}
                    />
                    <label className="form-check-label" htmlFor="smoking">
                      Smoking
                    </label>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className="list-extras wow fadeInUp">
            {quantityItems.map((elm, i) => (
              <div key={i} className="item-extra">
                <div className="extra-info">
                  <h5 className="text-20-medium color-text mb-5">
                    {elm.name} <span className="price">${elm.price}</span>
                  </h5>
                  <p className="text-14 color-grey">{elm.description}</p>
                </div>
                <div className="extra-quantity">
                  <span
                    onClick={() => handleQuantity(elm.quantity - 1, i)}
                    className="minus"
                  >
                    {" "}
                  </span>
                  <input
                    className="form-control"
                    onChange={(e) => handleQuantity(parseInt(e.target.value) || 0, i)}
                    type="text"
                    value={bookingData.babySeatingCapacity}
                  />
                  <span
                    onClick={() => handleQuantity(elm.quantity + 1, i)}
                    className="plus"
                  ></span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-45 wow fadeInUp">
            <div className="form-contact form-comment">
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <textarea
                        defaultValue={"Enter Your Request"}
                        value={bookingData.clientRequest} // Use controlled input
                        onChange={handleInputChange} // Update on change
                        className="form-control"
                        id="clientRequest"
                        name="clientRequest"
                        rows="5"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>


          <div className="mt-30 mb-120 wow fadeInUp">
            <Link
              className="btn btn-primary btn-primary-big w-100"
              href="/booking-passenger"
            >
              Continue
              <svg
                className="icon-16 ml-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                ></path>
              </svg>
            </Link>
          </div>
        </div>
      </div>
      <SideBar />
    </div>
  );
}
