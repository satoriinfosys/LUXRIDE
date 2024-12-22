'use client';
import apiService, { BASE_URL } from "@/app/_api/apiService";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Feet() {
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <section className="section pt-120 box-fleet-cover">
      <div className="box-fleet-padding">
        <div className="container-sub">
          <div className="row align-items-center">
            <div className="col-lg-6 col-7">
              <h2 className="heading-44-medium title-fleet wow fadeInUp">
                Our Fleet
              </h2>
            </div>
            <div className="col-lg-6 col-5 text-end">
              <Link
                className="text-16-medium color-primary wow fadeInUp"
                href="/fleet-list"
              >
                More Fleet
                <svg
                  className="icon-16"
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
          <div className="row mt-50">
            {cars
              .filter((elm) => elm.isFeatured) // Filter for featured items
              .slice(0, 3).map((elm, i) => (
                <div key={i} className="col-lg-4">
                  <div className="cardFleet cardFleetStyle2 wow fadeInUp">
                    <div className="cardInfo">
                      <Link href={`/fleet-single/${elm.id}`}>
                        <h3 className="text-20-medium color-text mb-10">
                          {elm.model}
                        </h3>
                      </Link>
                      <p className="text-14 color-text mb-30">
                        {elm.description}
                      </p>
                    </div>
                    <div className="cardImage mb-30">
                      <a href="#">
                        <Image
                          width={1530}
                          height={711}
                          style={{ height: "fit-content" }}
                          src={BASE_URL+`/user/image/${elm.image}`}
                          alt="Luxride"
                        />
                      </a>
                    </div>
                    <div className="cardInfoBottom">
                      <div className="passenger">
                        <span className="icon-circle icon-passenger"></span>
                        <span className="text-14">
                          Passengers<span> {elm.seatingCapacity}</span>
                        </span>
                      </div>
                      <div className="luggage">
                        <span className="icon-circle icon-luggage"></span>
                        <span className="text-14">
                          Luggage<span> {elm.luggageCapacity}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
