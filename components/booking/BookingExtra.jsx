'use client';
import { Suspense, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import SideBar from "./SideBar";
import { activeInputFocus } from "@/utlis/activeInputFocus";
import Link from "next/link";
import { rideSummaryState, selectedCarAtom } from "@/app/_state/states";
import { useRouter, useSearchParams } from "next/navigation";
import apiService from "@/app/_api/apiService";

const quantityItem = [
  {
    id: 1,
    name: "Child Seat",
    price: 3,
    description:
      "Suitable for toddlers weighing 0-18 kg (approx 0 to 4 years).",
    quantity: 1,
  },
];

function BookingExtraContent() {
  const [quantityItems, setquantityItems] = useState(quantityItem);
  const [bookingData, setBookingData] = useRecoilState(rideSummaryState);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [selectedCar, setSelectedCar] = useRecoilState(selectedCarAtom);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter(); // Initialize the router
  const searchParams = useSearchParams();
  let vehicle = searchParams.get('vehicle');


  const validate = () => {
    const newErrors = {};
    // Check if the flight number is provided
    newErrors.flightNumber = bookingData.flightNumber === "" ? "Flight number is required." : "";

    // // Check if the return date is provided
    // newErrors.returnDate = !bookingData.returnDate ? "Return date is required." : "";

    // // Check if drop-off location is provided
    // newErrors.dropOffLocation = bookingData.dropOffLocation === ""
    //   ? "Drop-off location is required."
    //   : "";

    // // Check if drop-off date is provided
    // newErrors.dropOffDate = !bookingData.dropOffDate ? "Drop-off date is required." : "";

    // // Check if drop-off time is provided
    // newErrors.dropOffTime = !bookingData.dropOffTime ? "Drop-off time is required." : "";

    setErrors(newErrors);

    // Check if the form is valid by ensuring there are no error messages
    const formValid = Object.values(newErrors).every((error) => error === "");
    setIsFormValid(formValid);

    return formValid;
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Proceed with form submission (e.g., navigation, API call, etc.)
      router.push("/booking-passenger");
    }
  };

  const getVehicleDetails = async () => {
    setIsLoading(true);
    try {
      if (!vehicle) {
        vehicle = selectedCar.id;
      }
      const endPoint = `/cars/${vehicle}`;
      const response = await apiService.get(endPoint);

      if (response) {
        setSelectedCar(response);
      } else {
        setSelectedCar(null);
      }
    } catch (error) {
      console.error("Error fetching car details:", error);
      setSelectedCar(null);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    activeInputFocus();
    getVehicleDetails();
  }, []);


  return (
    <div className="box-row-tab mt-50">
      <div className="box-tab-left">
        <div className="box-content-detail">
          <h3 className="heading-24-medium color-text mb-30 wow fadeInUp">
            Extra Options
          </h3>
          <div className="form-contact form-comment wow fadeInUp">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group">
                    <label className="form-label" htmlFor="flightNumber">
                      Flight/train number
                    </label>
                    <input
                      className="form-control"
                      id="flightNumber"
                      type="text"
                      name="flightNumber"
                      value={bookingData.flightNumber}
                      onChange={handleInputChange}
                    />
                    {errors.flightNumber && <p className="error">{errors.flightNumber}</p>}
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
                    {errors.returnDate && <p className="error">{errors.returnDate}</p>}
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
                    {errors.dropOffLocation && <p className="error">{errors.dropOffLocation}</p>}
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
                    {errors.dropOffDate && <p className="error">{errors.dropOffDate}</p>}
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
                    {errors.dropOffTime && <p className="error">{errors.dropOffTime}</p>}
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

                {/* <div className="col-lg-6">
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
                </div> */}
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
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="clientRequest">
                          Enter Your Request
                        </label>
                        <textarea
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
                </div>
              </div>

              <div className="mt-30 mb-120 wow fadeInUp">
                <Link
                  className="btn btn-primary btn-primary-big w-100"
                  href="/booking-passenger"
                  onClick={handleSubmit}
                  disabled={!isFormValid}
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
            </form>
          </div>
        </div>
      </div>
      {selectedCar ? <SideBar /> : <></>}

    </div>
  );
}

export default function BookingExtra() {
  return (<Suspense fallback={<div>Loading...</div>}>
    <BookingExtraContent />
  </Suspense>)
}
