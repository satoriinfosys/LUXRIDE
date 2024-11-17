'use client'
import { bookingDetails, rideSummaryState, selectedCarAtom } from "@/app/_state/states";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";

import mapboxgl from "mapbox-gl";

const accessToken = process.env.MAP_ACCESS_TOKEN || "pk.eyJ1IjoiMTIzcm9zaGFuMTIzIiwiYSI6ImNsZ2QwcGp3ZzAwN3UzbHA3eGd3cGVveG0ifQ.OcKGB8CjV8B0ZmGptJCO6g";


import { features } from "@/data/cars";
import { CHILD_SEAT_RATE, GRATUITY_AMOUNT, MEET_AND_GREET, SALES_TAX } from "@/utlis/constants";
import { calculateCost } from "@/utlis/calculateCost";


export default function SideBar() {
  const router = useRouter();
  const pathName = usePathname();

  const [bookingData, setBookingDetails] = useRecoilState(bookingDetails);
  const [selectedCar, setSelectedCar] = useRecoilState(selectedCarAtom);
  const [rideExtra, setRideExtra] = useRecoilState(rideSummaryState);

  const [finalPrice, setFinalPrice] = useState(0);
  const [carPrice, setCarPrice] = useState(0)

  const mapContainerRef = useRef(null); // Reference to the map container

  const fromCoordinates = bookingData?.from?.coordinates;
  const toCoordinates = bookingData?.to?.coordinates;


  useEffect(() => {

    if (bookingData?.from?.coordinates && bookingData?.to?.coordinates && bookingData.bookType !== "rate") {
      // Set your Mapbox Access Token
      mapboxgl.accessToken = accessToken;

      // Create the map
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11', // You can choose other styles
        center: [(fromCoordinates[0] + toCoordinates[0]) / 2, (fromCoordinates[1] + toCoordinates[1]) / 2], // Center map between the two points
        zoom: 10,
      });

      // Add navigation controls (zoom, rotate, etc.)
      map.addControl(new mapboxgl.NavigationControl());

      // Add markers for the from and to coordinates
      new mapboxgl.Marker()
        .setLngLat([fromCoordinates[0], fromCoordinates[1]])
        .setPopup(new mapboxgl.Popup().setHTML("<h3>From</h3>"))
        .addTo(map);

      new mapboxgl.Marker()
        .setLngLat([toCoordinates[0], toCoordinates[1]])
        .setPopup(new mapboxgl.Popup().setHTML("<h3>To</h3>"))
        .addTo(map);

      // Use Mapbox Directions API to get the route
      const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${fromCoordinates[0]},${fromCoordinates[1]};${toCoordinates[0]},${toCoordinates[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`;

      fetch(directionsUrl)
        .then(response => response.json())
        .then(data => {
          const routeGeoJson = data.routes[0].geometry;

          // Add the route as a line on the map
          map.on('load', () => {
            map.addSource('route', {
              type: 'geojson',
              data: {
                type: 'Feature',
                geometry: routeGeoJson,
              },
            });

            map.addLayer({
              id: 'route',
              type: 'line',
              source: 'route',
              layout: {
                'line-join': 'round',
                'line-cap': 'round',
              },
              paint: {
                'line-color': '#ff0000', // Route line color
                'line-width': 5,
              },
            });
          });
        })
        .catch(err => console.error('Error fetching directions:', err));
    }
  }, [fromCoordinates, toCoordinates]);

  const getTotalCost = () => {
    if (!selectedCar || !rideExtra) return;
    const { totalPrice, selectedCarPrice } = calculateCost({ selectedCar, rideExtra, bookingData });
    if (totalPrice && selectedCarPrice) {
      setCarPrice(selectedCarPrice);
      setFinalPrice(totalPrice);
    }
  }
  useEffect(() => {
    getTotalCost();
  }, [selectedCar, finalPrice]);


  return (
    <div className="box-tab-right">
      <div className="sidebar">
        <div className="d-flex align-items-center justify-content-between wow fadeInUp">
          <h6 className="text-20-medium color-text">Ride Summary</h6>
          <a
            className="text-14-medium color-text text-decoration-underline"
            onClick={(() => router.push("/"))}
          >
            Edit
          </a>
        </div>

        {/* Ride locations */}
        {
          bookingData?.bookType !== "rate" ?
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
            </div> : <></>
        }


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
                {bookingData.time ? new Date(bookingData.time).toLocaleTimeString() : "Time not selected"}
              </span>
            </li>
          </ul>
        </div>

        {/* Map and route info */}
        <div className="mt-20 wow fadeInUp">
          {bookingData.bookType !== "rate" ?
            <>
              <div className="box-map-route">
                <div ref={mapContainerRef} />
              </div>
              <div className="box-info-route">
                <div className="info-route-left">
                  <span className="text-14 color-grey">Total Distance</span>
                  <span className="text-14-medium color-text">
                    {bookingData.distanceInKm} km/ {bookingData.distanceInMiles}miles
                  </span>
                </div>
                <div className="info-route-left">
                  <span className="text-14 color-grey">Total Time</span>
                  <span className="text-14-medium color-text">{bookingData.durationInHours || 0} Hr {bookingData.durationInMinutes || 0}Mins</span>
                </div>
              </div>
            </> : <></>}


          {/* Extra Details Section */}
          {pathName !== "/booking-vehicle" ? <>
            <div className="border-bottom mt-30 mb-25"></div>
            <div className="mt-0">
              <span className="text-14 color-grey">Vehicle</span>
              <br />
              <span className="text-14-medium color-text">
                {selectedCar?.name}
              </span>
            </div>
            <div className="border-bottom mt-30 mb-25"></div>
            {/* <div className="mt-0">
              <span className="text-14 color-grey">Extra Options</span>
              <br />
              <span className="text-14-medium color-text">
                1 x Child Seat - $5.00
              </span>
              <br />
              <span className="text-14-medium color-text">
                1 x Bouquet of Flowers - $75.00
              </span>
              <br />
              <span className="text-14-medium color-text">
                2 x Vodka Bottle - $78.00
              </span>
              <br />
              <span className="text-14-medium color-text">
                1 x Bodyguard Service - $750.00
              </span>
            </div> */}
          </>
            : <></>}
        </div>
      </div>

      {/* Features Section */}
      {pathName === "/booking-vehicle" ?
        <div className="sidebar wow fadeInUp">
          <ul className="list-ticks list-ticks-small list-ticks-small-booking">
            {features.map((elm, i) => (
              <li key={i} className="text-14 mb-20">
                {elm}
              </li>
            ))}
          </ul>
        </div> : <></>}

      {/* Total Section */}
      {pathName !== "/booking-vehicle" ?
        <div className="sidebar wow fadeInUp">
          <ul className="list-prices list-prices-2">
            <li>
              <span className="text">Selected vehicle</span>
              <span className="price">${carPrice}</span>
            </li>
            {rideExtra.meetAndGreet ?
              <li>
                <span className="text">Meet And Greet</span>
                <span className="price">${MEET_AND_GREET}</span>
              </li> : <></>
            }
            {rideExtra.babySeatingCapacity >= 2 ?
              <li>
                <span className="text">Baby Seat</span>
                <span className="price">${rideExtra.babySeatingCapacity * CHILD_SEAT_RATE}</span>
              </li> : <></>
            }
            <li>
              <span className="text">Gratuity Amount</span>
              <span className="price">${GRATUITY_AMOUNT}</span>
            </li>
            <li>
              <span className="text">Sales Tax</span>
              <span className="price">${SALES_TAX}</span>
            </li>

          </ul>
          <div className="border-bottom mt-30 mb-15"></div>
          <ul className="list-prices">
            <li>
              <span className="text text-20-medium">Total</span>
              <span className="price text-20-medium">${finalPrice}</span>
            </li>
          </ul>
        </div> : <></>}
    </div>
  );
}
