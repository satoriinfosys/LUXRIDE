'use client';
import React, { useEffect, useState } from "react";
import Pagination from "../common/Pagination";
import { cars, features } from "@/data/cars";
import Image from "next/image";
import Link from "next/link";
import apiService from "@/app/_api/apiService";
import { useRecoilValue } from "recoil";
import { bookingDetails } from "@/app/_state/states";

export default function BookingVehicles() {
  const [cars, setCars] = useState([]); // For locations fetched from API
  const [isLoading, setIsLoading] = useState(false);
  const bookingData = useRecoilValue(bookingDetails);

  const fetchCar = async () => {
    setIsLoading(true);
    try {
      const endPoint = "/cars/get-all";
      const response = await apiService.get(endPoint);

      if (response.data && Array.isArray(response.data)) {
        setCars(response.data);
      } else {
        setCars([]);
      }
    } catch (error) {
      console.error("Error fetching locations:", error);
      setCars([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCar();
  }, [])

  console.log(bookingData)

  return (
    <div className="box-row-tab mt-50">
      <div className="box-tab-left">
        <div className="box-content-detail">
          <h3 className="heading-24-medium color-text mb-30 wow fadeInUp">
            Select Your Car
          </h3>
          <div className="list-vehicles wow fadeInUp">
            {cars.map((elm, i) => (
              <div key={i} className="item-vehicle wow fadeInUp">
                <div className="vehicle-left">
                  <div className="vehicle-image">
                    <Image
                      width={1530}
                      height={711}
                      style={{ height: "fit-content" }}
                      src={elm.imgSrc}
                      alt="luxride"
                    />
                  </div>
                  <div className="vehicle-facilities">
                    {elm.features.map((feature, index) => (
                      <div key={index} className="text-fact meet-greeting">
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* <div className="vehicle-facilities">
                    <div className="text-fact meet-greeting">
                      Meet & Greet included
                    </div>
                    <div className="text-fact free-cancel">
                      Free cancellation
                    </div>
                    <div className="text-fact free-waiting">
                      Free Waiting time
                    </div>
                    <div className="text-fact safe-travel">
                      Safe and secure travel
                    </div>
                  </div> */}
                  <div className="mt-10">
                    <Link className="link text-14-medium" href="/booking-extra">
                      Show more information
                    </Link>
                  </div>
                </div>
                <div className="vehicle-right">
                  <h5 className="text-20-medium color-text mb-10">
                    {elm.name}
                  </h5>
                  <p className="text-14 color-text mb-20">{elm.description}</p>
                  <div className="vehicle-passenger-luggage mb-10">
                    <span className="passenger">
                      Passengers {elm.passenger}
                    </span>
                    <span className="luggage">Luggage {elm.luggage}</span>
                  </div>
                  <div className="vehicle-price">
                    <h4 className="heading-30-medium color-text">
                      ${elm.prizePerDistance}/km
                    </h4>
                  </div>
                  <div className="price-desc mb-20">
                    All prices include VAT, fees &amp; tip.
                  </div>
                  <Link className="btn btn-primary w-100" href="/booking-extra">
                    Select
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
            ))}
          </div>
        </div>
      </div>
      <div className="box-tab-right">
      <div className="sidebar">
        <div className="d-flex align-items-center justify-content-between wow fadeInUp">
          <h6 className="text-20-medium color-text">Ride Summary</h6>
          <a
            className="text-14-medium color-text text-decoration-underline"
            href="#"
          >
            Edit
          </a>
        </div>

        {/* Ride locations */}
        <div className="mt-20 wow fadeInUp">
          <ul className="list-routes">
            {bookingData.from.name && (
              <li>
                <span className="location-item">A </span>
                <span className="info-location text-14-medium">
                  {bookingData.from.name || "From not selected"}
                </span>
              </li>
            )}
            {bookingData.to.name && (
              <li>
                <span className="location-item">B </span>
                <span className="info-location text-14-medium">
                  {bookingData.to.name || "To not selected"}
                </span>
              </li>
            )}
          </ul>
        </div>

        {/* Date and Time */}
        <div className="mt-20 wow fadeInUp">
          <ul className="list-icons">
            <li>
              <span className="icon-item icon-plan"> </span>
              <span className="info-location text-14-medium">
                {bookingData.date
                  ? new Date(bookingData.date).toDateString()
                  : "Date not selected"}
              </span>
            </li>
            <li>
              <span className="icon-item icon-time"></span>
              <span className="info-location text-14-medium">
                {bookingData.time || "Time not selected"}
              </span>
            </li>
          </ul>
        </div>

        {/* Map and route info */}
        <div className="mt-20 wow fadeInUp">
          <div className="box-map-route">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2zVGjDoG5oIHBo4buRIE5ldyBZb3JrLCBUaeG7g3UgYmFuZyBOZXcgWW9yaywgSG9hIEvhu7M!5e0!3m2!1svi!2s!4v1679223612023!5m2!1svi!2s"
              style={{ border: "0px" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="box-info-route">
            <div className="info-route-left">
              <span className="text-14 color-grey">Total Distance</span>
              <span className="text-14-medium color-text">
                311 km/ 194 miles
              </span>
            </div>
            <div className="info-route-left">
              <span className="text-14 color-grey">Total Time</span>
              <span className="text-14-medium color-text">3h 43m</span>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="sidebar wow fadeInUp">
        <ul className="list-ticks list-ticks-small list-ticks-small-booking">
          {features.map((elm, i) => (
            <li key={i} className="text-14 mb-20">
              {elm}
            </li>
          ))}
        </ul>
      </div>
    </div>
      {/* <div className="box-tab-right">
        <div className="sidebar">
          <div className="d-flex align-items-center justify-content-between wow fadeInUp">
            <h6 className="text-20-medium color-text">Ride Summary</h6>
            <a
              className="text-14-medium color-text text-decoration-underline"
              href="#"
            >
              Edit
            </a>
          </div>
          <div className="mt-20 wow fadeInUp">
            <ul className="list-routes">
              <li>
                <span className="location-item">A </span>
                <span className="info-location text-14-medium">
                  Manchester, UK
                </span>
              </li>
              <li>
                <span className="location-item">A </span>
                <span className="info-location text-14-medium">London, UK</span>
              </li>
            </ul>
          </div>
          <div className="mt-20 wow fadeInUp">
            <ul className="list-icons">
              <li>
                <span className="icon-item icon-plan"> </span>
                <span className="info-location text-14-medium">
                  Thu, Oct 06, 2022
                </span>
              </li>
              <li>
                <span className="icon-item icon-time"></span>
                <span className="info-location text-14-medium">6 PM : 15</span>
              </li>
            </ul>
          </div>
          <div className="mt-20 wow fadeInUp">
            <div className="box-map-route">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2zVGjDoG5oIHBo4buRIE5ldyBZb3JrLCBUaeG7g3UgYmFuZyBOZXcgWW9yaywgSG9hIEvhu7M!5e0!3m2!1svi!2s!4v1679223612023!5m2!1svi!2s"
                style={{ border: "0px" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="box-info-route">
              <div className="info-route-left">
                <span className="text-14 color-grey">Total Distance</span>
                <span className="text-14-medium color-text">
                  311 km/ 194 miles
                </span>
              </div>
              <div className="info-route-left">
                <span className="text-14 color-grey">Total Time</span>
                <span className="text-14-medium color-text">3h 43m</span>
              </div>
            </div>
          </div>
        </div>
        <div className="sidebar wow fadeInUp">
          <ul className="list-ticks list-ticks-small list-ticks-small-booking">
            {features.map((elm, i) => (
              <li key={i} className="text-14 mb-20">
                {elm}
              </li>
            ))}
          </ul>
        </div>
      </div> */}
    </div>
  );
}
