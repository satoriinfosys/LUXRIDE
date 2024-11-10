"use client";

import { useRecoilState } from 'recoil';
import { paymentDetailsAtom } from "@/app/_state/states";
import { activeInputFocus } from "@/utlis/activeInputFocus";
import { useEffect, useState } from "react";
import SideBar from "./SideBar";
import Image from "next/image";
import { useRouter } from "next/navigation"; // To handle navigation


export default function BookingPayment() {
  const [paymentDetails, setPaymentDetails] = useRecoilState(paymentDetailsAtom);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  useEffect(() => {
    // Focus event
    activeInputFocus();
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setPaymentDetails((prevDetails) => ({
      ...prevDetails,
      [id]: value,
    }));
  };

  const validateForm = () => {
    let newErrors = {};
    // Validate Cardholder Name
    if (!paymentDetails.cardName) {
      newErrors.cardName = "Cardholder Name is required";
    }
    // Validate Card Number
    if (!paymentDetails.cardNumber || !/^\d{16}$/.test(paymentDetails.cardNumber)) {
      newErrors.cardNumber = "Invalid Card Number. Must be 16 digits.";
    }
    // Validate Expiry Month
    if (!paymentDetails.cardExpiryMonth) {
      newErrors.cardExpiryMonth = "Month is required";
    }
    // Validate Expiry Year
    if (!paymentDetails.cardExpiryYear) {
      newErrors.cardExpiryYear = "Year is required";
    } else if (paymentDetails.cardExpiryYear < new Date().getFullYear()) {
      newErrors.cardExpiryYear = "Year must be greater than or equal to the current year";
    }
    // Validate CVV
    if (!paymentDetails.cvv || !/^\d{3}$/.test(paymentDetails.cvv)) {
      newErrors.cvv = "Invalid CVV. Must be 3 digits.";
    }
    // Validate Checkbox
    if (!paymentDetails.agree) {
      newErrors.agree = "You must accept the Terms & Conditions.";
    }

    return newErrors;
  };

  const handleContinueClick = () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      // If no errors, navigate to booking-received
        router.push("/booking-received");
    } else {
      // Set errors if there are validation issues
      setErrors(formErrors);
    }
  };

  return (
    <div className="box-row-tab mt-50">
      <div className="box-tab-left">
        <div className="box-content-detail">
          <div className="form-contact form-comment wow fadeInUp">
            <div className="mt-30"></div>
            <h3 className="heading-24-medium color-text mb-30">
              Select Payment Method
            </h3>
            <div className="form-contact form-comment">
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group">
                    <select
                      id="cardType"
                      className="form-control"
                      value={paymentDetails.cardType}
                      onChange={handleInputChange}
                    >
                      <option value="Credit Card">Credit Card</option>
                      <option value="Paypal">Paypal</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-30"></div>
            <h3 className="heading-24-medium color-text mb-30">
              Credit Card Payment
            </h3>
            <div className="form-contact form-comment">
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group">
                    <label className="form-label" htmlFor="cardName">
                      Card Holder Name
                    </label>
                    <input
                      className="form-control"
                      id="cardName"
                      type="text"
                      value={paymentDetails.cardName}
                      onChange={handleInputChange}
                    />
                    {errors.cardName && <p className="error">{errors.cardName}</p>}
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <label className="form-label" htmlFor="cardNumber">
                      Card Number
                    </label>
                    <input
                      className="form-control"
                      id="cardNumber"
                      type="text"
                      value={paymentDetails.cardNumber}
                      onChange={handleInputChange}
                    />
                    {errors.cardNumber && <p className="error">{errors.cardNumber}</p>}
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-12">
                  <div className="form-group">
                    <label className="form-label" htmlFor="cardExpiryMonth">
                      Month
                    </label>
                    <select
                      id="cardExpiryMonth"
                      className="form-control"
                      value={paymentDetails.cardExpiryMonth}
                      onChange={handleInputChange}
                    >
                      <option value=""></option>
                      {[...Array(12).keys()].map((i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                    {errors.cardExpiryMonth && <p className="error">{errors.cardExpiryMonth}</p>}
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-12">
                  <div className="form-group">
                    <label className="form-label" htmlFor="cardExpiryYear">
                      Year
                    </label>
                    <select
                      id="cardExpiryYear"
                      className="form-control"
                      value={paymentDetails.cardExpiryYear}
                      onChange={handleInputChange}
                    >
                      <option value=""></option>
                      {[2023, 2024, 2025, 2026, 2027, 2028].map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                    {errors.cardExpiryYear && <p className="error">{errors.cardExpiryYear}</p>}
                  </div>
                </div>
                <div className="col-lg-6 col-md-4 col-sm-12">
                  <div className="form-group">
                    <label className="form-label" htmlFor="cvv">
                      CVV
                    </label>
                    <input
                      className="form-control"
                      id="cvv"
                      type="text"
                      value={paymentDetails.cvv}
                      onChange={handleInputChange}
                    />
                    {errors.cvv && <p className="error">{errors.cvv}</p>}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-0">
              <Image
                width={313}
                height={32}
                src="/assets/imgs/page/booking/payment-card.png"
                alt="luxride"
              />
            </div>
            <p className="text-14 mt-10 color-text">
              The credit card must be issued in the driver's name. Debit cards
              are accepted at some locations and for some car categories.
            </p>
            <div className="mt-30">
              <label className="mb-10 mb-15" htmlFor="agree-cb">
                <input className="cb-agree" id="agree-cb" type="checkbox"
                  checked={paymentDetails.agree}
                  onChange={(e) => {
                    setPaymentDetails({
                      ...paymentDetails,
                      agree: e.target.checked,
                    });
                  }}
                />I
                accept the Terms & Conditions - Booking Conditions and Privacy
                Policy. *
              </label>
              {errors.agree && <p className="error">{errors.agree}</p>}
              <label htmlFor="subscriber">
                <input
                  className="cb-subscriber"
                  id="subscriber"
                  type="checkbox"
                />
                I want to subscribe to Transfeero’s newsletter (Travel tips and
                special deals)
              </label>
            </div>
          </div>
          <div className="mt-30 mb-120 wow fadeInUp">
            <button
              className="btn btn-primary btn-primary-big w-100"
              onClick={handleContinueClick}
            >
              Book Now
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
