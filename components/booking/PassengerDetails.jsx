"use client";
import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { bookingDetails, reservationDetails, rideSummaryState, selectedCarAtom } from "@/app/_state/states";
import SideBar from "./SideBar";
import { useRouter } from "next/navigation"; // To handle navigation
import apiService from "@/app/_api/apiService";
import { calculateCost } from "@/utlis/calculateCost";
import { GRATUITY_AMOUNT } from "@/utlis/constants";

export default function PassengerDetails() {
  const [rideExtra, setRideExtra] = useRecoilState(rideSummaryState);
  const [bookingData, setBookingDetails] = useRecoilState(bookingDetails);
  const [selectedCar, setSelectedCar] = useRecoilState(selectedCarAtom);
  const [reservationData, setReservationData] = useRecoilState(reservationDetails);

  const [errors, setErrors] = useState({ email: "", phone: "", name: "", lastName: "" });
  const router = useRouter();

  // Focus and blur events for styling
  useEffect(() => {
    document
      .querySelectorAll(".form-comment input, .form-comment textarea, .form-comment select")
      ?.forEach((element) => {
        element.addEventListener("focus", () => {
          element.closest(".form-group").classList.add("focused");
        });
        element.addEventListener("blur", () => {
          if (element.value === "") {
            element.classList.remove("filled");
            element.closest(".form-group").classList.remove("focused");
          } else {
            element.classList.add("filled");
          }
        });
      });

    document
      .querySelectorAll(".form-comment input, .form-comment textarea, .form-comment select")
      ?.forEach((element) => {
        if (element?.value !== "") {
          element.closest(".form-group").classList.add("focused");
          element.classList.add("filled");
        }
      });
  }, []);

  // Update Recoil state when input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setRideExtra((prev) => ({
      ...prev,
      [id]: id === "totalLuggage" || id === "totalSeating" ? parseInt(value) : value,
    }));
  };

  // Validation functions
  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
  };

  const validatePhone = (phone) => {
    const re = /^[0-9]{10}$/;
    return re.test(phone);
  };

  const getLoggedInUserId = () => {
    // Retrieve user details from localStorage
    const savedUserDetails = JSON.parse(localStorage.getItem("userDetails"));
    if (savedUserDetails) {
      return savedUserDetails.userId;
    }
    return null;
  }


  const createReservation = async () => {

    try {
      const { totalPrice } = calculateCost({ selectedCar, rideExtra, bookingData });

      const reservationDetails = {
        "firstName": rideExtra?.firstName,
        "lastName": rideExtra?.lastName,
        "email": rideExtra?.email,
        "phone": rideExtra?.phone,
        "address": bookingData?.from?.name,
        "pickUpLocation": bookingData?.from?.name,
        "pickUpDate": bookingData?.date || undefined,
        "pickUpTime": bookingData?.time || undefined,
        "returnDate": rideExtra?.dropOffDate || undefined,
        "dropOffLocation": bookingData?.to?.name,
        "dropOffDate": rideExtra?.dropOffDate || undefined,
        "dropOffTime": rideExtra?.dropOffTime || undefined,
        "meetAndGreet": rideExtra?.meetAndGreet,
        "clientRequest": rideExtra?.clientRequest,
        "gratuityPercentage": null,
        "gratuityAmount": GRATUITY_AMOUNT,
        "customerId": null,
        "smoking": false,
        "totalHour": (bookingData?.durationInHours || 0) + " Hr" + (bookingData?.durationInMinutes || 0) + " Mins",
        "totalDistance": bookingData?.distanceInMiles,
        "isByHour": bookingData?.bookType === "hourly" ? true : false,
        "isRoundTrip": true,
        "carId": selectedCar?.id,
        "userId": getLoggedInUserId(),
        "totalSeating": rideExtra?.totalSeating,
        "totalLuggage": rideExtra?.totalLuggage,
        "paymentStatus": "pending",
        "reservationStatus": "pending",
        "cardType": null,
        "cardNumber": null,
        "babySeatingCapacity": rideExtra?.babySeatingCapacity,
        "cvv": null,
        "gratitude": 10,
        "cardExpiryDate": null,
        "cardName": null,
        "nameoncard": null,
        "expectedDuration": (bookingData?.durationInHours || 0) + " Hr" + (bookingData?.durationInMinutes || 0) + " Mins",
        "expectedTime": bookingData?.time,
        "flightNumber": rideExtra?.flightNumber,
        "terminalNumber": rideExtra?.terminalNumber,
        "flightDetails": bookingData?.flightDetails,
        "dropOffCheck": bookingData?.dropOffCheck,
        "paymentAmount": totalPrice,
        "paymentToken": null,
        "paymentType": null,
        "reservationApproval": "pending",
        "smokingFee": 0,
        "stripeToken": null
      }

      const response = await apiService.post("/reservation", reservationDetails);
      setReservationData(response.data)
      router.push("/booking-payment");
    } catch (error) {
      console.error("Error while reservation", error?.message)
    }
  }


  // Handle form submission
  const handleContinueClick = async () => {
    const newErrors = { email: "", phone: "", name: "", lastName: "" };
    let formIsValid = true;

    // Validate name and last name
    if (!rideExtra.firstName) {
      newErrors.name = "Name is required";
      formIsValid = false;
    }

    if (!rideExtra.lastName) {
      newErrors.lastName = "Last name is required";
      formIsValid = false;
    }

    // Validate email
    if (!rideExtra.email || !validateEmail(rideExtra.email)) {
      newErrors.email = "Please enter a valid email address";
      formIsValid = false;
    }

    // Validate phone number
    if (!rideExtra.phone || !validatePhone(rideExtra.phone)) {
      newErrors.phone = "Please enter a valid phone number";
      formIsValid = false;
    }

    setErrors(newErrors);

    // Navigate on successful validation
    if (formIsValid) {
      // create reservation
      await createReservation();
    }
  };


  return (
    <div className="box-row-tab mt-50">
      <div className="box-tab-left">
        <div className="box-content-detail">
          <h3 className="heading-24-medium color-text mb-30 wow fadeInUp">
            Passenger Details
          </h3>
          <div className="form-contact form-comment wow fadeInUp">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="firstName">
                      Name
                    </label>
                    <input
                      className="form-control"
                      id="firstName"
                      type="text"
                      value={rideExtra.firstName || ""}
                      onChange={handleInputChange}
                    />
                    {errors.name && <span className="error">{errors.name}</span>}
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="lastName">
                      Last Name
                    </label>
                    <input
                      className="form-control"
                      id="lastName"
                      type="text"
                      value={rideExtra.lastName || ""}
                      onChange={handleInputChange}
                    />
                    {errors.lastName && <span className="error">{errors.lastName}</span>}
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="email">
                      Email Address
                    </label>
                    <input
                      className="form-control"
                      id="email"
                      type="text"
                      value={rideExtra.email || ""}
                      onChange={handleInputChange}
                    />
                    {errors.email && <span className="error">{errors.email}</span>}
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="phone">
                      Phone Number
                    </label>
                    <input
                      className="form-control"
                      id="phone"
                      type="text"
                      value={rideExtra.phone || ""}
                      onChange={handleInputChange}
                    />
                    {errors.phone && <span className="error">{errors.phone}</span>}
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="mt-30"></div>
          <h3 className="heading-24-medium color-text mb-30 wow fadeInUp">
            Options
          </h3>
          <div className="form-contact form-comment wow fadeInUp">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="totalSeating">
                      Passengers
                    </label>
                    <select
                      className="form-control"
                      id="totalSeating"
                      value={rideExtra.totalSeating || 0}
                      onChange={handleInputChange}
                    >
                      {[...Array(11).keys()].map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="totalLuggage">
                      Luggage
                    </label>
                    <select
                      className="form-control"
                      id="totalLuggage"
                      value={rideExtra.totalLuggage || 0}
                      onChange={handleInputChange}
                    >
                      {[...Array(11).keys()].map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <label className="form-label" htmlFor="notes">
                      Notes to driver
                    </label>
                    <textarea
                      className="form-control"
                      id="notes"
                      rows="5"
                      value={rideExtra.notes || ""}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="mt-30 mb-120 wow fadeInUp">
            <button
              type="button"
              className="btn btn-primary btn-primary-big w-100"
              onClick={handleContinueClick}
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
            </button>
          </div>
        </div>
      </div>
      <SideBar />
    </div>
  );
}
