'use client';
import React, { useEffect, useRef, useState } from "react";
import { features } from "@/data/cars";
import Image from "next/image";
import Link from "next/link";
import apiService from "@/app/_api/apiService";
import { useRecoilState } from "recoil";
import { bookingDetails } from "@/app/_state/states";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import SideBar from "./SideBar";

const accessToken = process.env.MAP_ACCESS_TOKEN || "pk.eyJ1IjoiMTIzcm9zaGFuMTIzIiwiYSI6ImNsZ2QwcGp3ZzAwN3UzbHA3eGd3cGVveG0ifQ.OcKGB8CjV8B0ZmGptJCO6g";

export default function BookingVehicles() {
  const [cars, setCars] = useState([]); // For locations fetched from API
  const [isLoading, setIsLoading] = useState(false);
  const [bookingData, setBookingDetails] = useRecoilState(bookingDetails);

  const router = useRouter();
  const searchParams = useSearchParams();
  let book = searchParams.get('book');

  if (!book) {
    book = bookingData?.bookType || null;
  }

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

  const getDistanceAndTime = async () => {
    try {
      const startCoordinates = bookingData.from.coordinates;
      const endCoordinates = bookingData.to.coordinates;

      const profile = "driving"; // You can change this to "walking", "cycling", etc., if needed
      const response = await axios.get(`https://api.mapbox.com/directions/v5/mapbox/${profile}/${startCoordinates[0]},${startCoordinates[1]};${endCoordinates[0]},${endCoordinates[1]}?geometries=polyline&steps=true&overview=full&language=en&access_token=${accessToken}`);

      const data = response.data;
      const distanceInMeters = data.routes[0].distance;  // Distance in meters
      const distanceInKm = distanceInMeters / 1000;  // Distance in meters
      const durationInSeconds = data.routes[0].duration;  // Duration in seconds

      // Convert distance from meters to miles
      const distanceInMiles = distanceInMeters / 1609.34;

      // Convert duration from seconds to hours
      const durationInHours = Math.floor(durationInSeconds / 3600); // Whole hours
      const durationInMinutes = Math.floor((durationInSeconds % 3600) / 60); // Remaining minutes

      setBookingDetails(prevState => ({
        ...prevState,
        distanceInKm: distanceInKm.toFixed(2),  // Rounded to two decimal places
        distanceInMiles: distanceInMiles.toFixed(2),
        durationInHours: durationInHours,
        durationInMinutes: durationInMinutes,
        bookType: book,
      }));

    } catch (error) {
      console.error("Error fetching data from Mapbox:", error);
    }
  }

  useEffect(() => {
    fetchCar();

    if (book !== "rate") {
      getDistanceAndTime()
    } else {
      setBookingDetails(prevState => ({ ...prevState, 
        bookType: book
      }));
    };
  }, [])

  const handleSelectVehicle = (id) => {
    router.push(`/booking-extra?vehicle=${id}`)
  }

  return (
    <div className="box-row-tab mt-50">
      <div className="box-tab-left">
        <div className="box-content-detail">
          <h3 className="heading-24-medium color-text mb-30 wow fadeInUp">
            Select Your Car
          </h3>
          <div className="list-vehicles wow fadeInUp">
            {cars.map((elm, i) => {
              let price = elm.prizePerDistance + "/mile";
              if (book === "rate") price = elm.flatRate;
              if (book === "hourly") price = elm.prizePerHour + "/hr";

              return (<div key={i} className="item-vehicle wow fadeInUp">
                <div className="vehicle-left">
                  <div className="vehicle-image">
                    <Image
                      width={1530}
                      height={711}
                      style={{ height: "fit-content" }}
                      src={elm.imgSrc || "/"}
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
                      ${price}
                    </h4>
                  </div>
                  <div className="price-desc mb-20">
                    All prices include VAT, fees &amp; tip.
                  </div>
                  <a className="btn btn-primary w-100" onClick={() => handleSelectVehicle(elm.id)}>
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
                  </a>
                </div>
              </div>
              )
            })}
          </div>
        </div>
      </div>
      <SideBar />
    </div>
  );
}
