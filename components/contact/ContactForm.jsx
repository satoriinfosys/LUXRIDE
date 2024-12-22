"use client";

import apiService from "@/app/_api/apiService";
import { activeInputFocus } from "@/utlis/activeInputFocus";
import { useEffect, useState } from "react";

export default function ContactForm() {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    // Focus event
    activeInputFocus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Gather form data
    const enquiryDetails = {
      fullname: e.target.fullname.value,
      email: e.target.email.value,
      subject: e.target.subject.value,
      message: e.target.message.value,
    };

    try {

      const response = await apiService.post("/contact", enquiryDetails)

      setShowSuccessMessage(true);
      e.target.reset();

    } catch (error) {
      console.error('Error submitting enquiry:', error);
    }
  };

  return (
    <section className="section mt-120 mb-120">
      <div className="container-sub">
        <div className="mw-770">
          <h2 className="heading-44-medium mb-60 text-center wow fadeInUp">
            Leave us your info 
          </h2>
          <div className="form-contact form-comment wow fadeInUp">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-lg-6 col-md-6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="fullname">
                      Full Name
                    </label>
                    <input
                      className="form-control"
                      id="fullname"
                      name="fullname"
                      type="text"
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
                      placeholder=""
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <label className="form-label" htmlFor="subject">
                      Subject
                    </label>
                    <input
                      className="form-control"
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder=""
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <label className="form-label" htmlFor="message">
                      Message
                    </label>
                    <textarea
                      className="form-control"
                      id="message"
                      name="message"
                    ></textarea>
                  </div>
                </div>
                <div className="col-lg-12">
                  <button className="btn btn-primary" type="submit">
                    Get In Touch
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
            </form>
            {showSuccessMessage && (
              <div className="success-message">
                <p>Your enquiry has been submitted successfully!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

