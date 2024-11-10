"use client";
import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { rideSummaryState } from "@/app/_state/states";
import SideBar from "./SideBar";
import { useRouter } from "next/navigation"; // To handle navigation

export default function PassengerDetails() {
  const [bookingData, setBookingData] = useRecoilState(rideSummaryState);
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
    setBookingData((prev) => ({
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

  // Handle form submission
  const handleContinueClick = () => {
    const newErrors = { email: "", phone: "", name: "", lastName: "" };
    let formIsValid = true;

    // Validate name and last name
    if (!bookingData.firstName) {
      newErrors.name = "Name is required";
      formIsValid = false;
    }

    if (!bookingData.lastName) {
      newErrors.lastName = "Last name is required";
      formIsValid = false;
    }

    // Validate email
    if (!bookingData.email || !validateEmail(bookingData.email)) {
      newErrors.email = "Please enter a valid email address";
      formIsValid = false;
    }

    // Validate phone number
    if (!bookingData.phone || !validatePhone(bookingData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
      formIsValid = false;
    }

    setErrors(newErrors);

    // Navigate on successful validation
    if (formIsValid) {
      router.push("/booking-payment");
    }
  };

  console.log({ bookingData });

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
                      value={bookingData.firstName || ""}
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
                      value={bookingData.lastName || ""}
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
                      value={bookingData.email || ""}
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
                      value={bookingData.phone || ""}
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
                      value={bookingData.totalSeating || 0}
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
                      value={bookingData.totalLuggage || 0}
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
                      value={bookingData.notes || ""}
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
