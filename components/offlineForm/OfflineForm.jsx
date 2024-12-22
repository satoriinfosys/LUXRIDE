"use client";

import apiService from "@/app/_api/apiService";
import { activeInputFocus } from "@/utlis/activeInputFocus";
import { useEffect, useState } from "react";

export default function OfflineForm() {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    // Focus event
    activeInputFocus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Gather form data
    const enquiryDetails = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      address: e.target.address.value,
      carId: parseInt(e.target.carId.value, 10),
      message: e.target.message.value,
      totalSeating: parseInt(e.target.totalSeating.value, 10),
      replied: false,
      totalLuggage: parseInt(e.target.totalLuggage.value, 10),
      pickUpLocation: e.target.pickUpLocation.value,
      pickUpDate: e.target.pickUpDate.value,
      pickUpTime: e.target.pickUpTime.value,
      dropOffLocation: e.target.dropOffLocation.value,
      dropOffDate: e.target.dropOffDate.value,
      dropOffTime: e.target.dropOffTime.value,
      // serviceAreaId: parseInt(e.target.serviceAreaId.value, 10),
      // serviceId: parseInt(e.target.serviceId.value, 10),
    };

    try {
      const response = await apiService.post("/enquiry", enquiryDetails);
      setShowSuccessMessage(true);
      e.target.reset();
    } catch (error) {
      console.error("Error submitting enquiry:", error);
    }
  };

  return (
    <section className="section mt-120 mb-120">
      <div className="container-sub">
        <div className="mw-770">
          <h2 className="heading-44-medium mb-60 text-center wow fadeInUp">
            Leave us booking details
          </h2>
          <div className="form-contact form-comment wow fadeInUp">
            <form onSubmit={handleSubmit}>
              <div className="row">
                {/* Existing Fields */}
                <div className="col-lg-6 col-md-6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="firstName">
                      First Name
                    </label>
                    <input
                      className="form-control"
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="lastName">
                      Last Name
                    </label>
                    <input
                      className="form-control"
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="email">
                      Email
                    </label>
                    <input
                      className="form-control"
                      id="email"
                      name="email"
                      type="email"
                      required
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="phone">
                      Phone
                    </label>
                    <input
                      className="form-control"
                      id="phone"
                      name="phone"
                      type="text"
                      required
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <label className="form-label" htmlFor="address">
                      Address
                    </label>
                    <input
                      className="form-control"
                      id="address"
                      name="address"
                      type="text"
                      required
                    />
                  </div>
                </div>

                {/* New Fields */}
                {/* <div className="col-lg-6 col-md-6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="carId">
                      Car ID
                    </label>
                    <input
                      className="form-control"
                      id="carId"
                      name="carId"
                      type="number"
                      required
                    />
                  </div>
                </div> */}
                {/* <div className="col-lg-6 col-md-6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="totalSeating">
                      Total Seating
                    </label>
                    <input
                      className="form-control"
                      id="totalSeating"
                      name="totalSeating"
                      type="number"
                      required
                    />
                  </div>
                </div> */}
                {/* <div className="col-lg-6 col-md-6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="totalLuggage">
                      Total Luggage
                    </label>
                    <input
                      className="form-control"
                      id="totalLuggage"
                      name="totalLuggage"
                      type="number"
                      required
                    />
                  </div>
                </div> */}
                <div className="col-lg-6 col-md-6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="pickUpLocation">
                      Pick-Up Location
                    </label>
                    <input
                      className="form-control"
                      id="pickUpLocation"
                      name="pickUpLocation"
                      type="text"
                      required
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="pickUpDate">
                      Pick-Up Date
                    </label>
                    <input
                      className="form-control"
                      id="pickUpDate"
                      name="pickUpDate"
                      type="date"
                      required
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="pickUpTime">
                      Pick-Up Time
                    </label>
                    <input
                      className="form-control"
                      id="pickUpTime"
                      name="pickUpTime"
                      type="time"
                      required
                    />
                  </div>
                </div>
                {/* <div className="col-lg-6 col-md-6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="dropOffLocation">
                      Drop-Off Location
                    </label>
                    <input
                      className="form-control"
                      id="dropOffLocation"
                      name="dropOffLocation"
                      type="text"
                      required
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="dropOffDate">
                      Drop-Off Date
                    </label>
                    <input
                      className="form-control"
                      id="dropOffDate"
                      name="dropOffDate"
                      type="date"
                      required
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="dropOffTime">
                      Drop-Off Time
                    </label>
                    <input
                      className="form-control"
                      id="dropOffTime"
                      name="dropOffTime"
                      type="time"
                      required
                    />
                  </div>
                </div> */}
                {/* <div className="col-lg-6 col-md-6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="serviceAreaId">
                      Service Area ID
                    </label>
                    <input
                      className="form-control"
                      id="serviceAreaId"
                      name="serviceAreaId"
                      type="number"
                      required
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="serviceId">
                      Service ID
                    </label>
                    <input
                      className="form-control"
                      id="serviceId"
                      name="serviceId"
                      type="number"
                      required
                    />
                  </div>
                </div> */}
                <div className="col-lg-12">
                  <div className="form-group">
                    <label className="form-label" htmlFor="message">
                      Message
                    </label>
                    <textarea
                      className="form-control"
                      id="message"
                      name="message"
                      required
                    ></textarea>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <button className="btn btn-primary" type="submit">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          {showSuccessMessage && (
            <p className="success-message">
              Your enquiry has been submitted successfully!
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
