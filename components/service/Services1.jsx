'use client';
import React, { useState, useEffect } from "react";
import Pagination from "../common/Pagination";
import Image from "next/image";
import Link from "next/link";
import apiService from "@/app/_api/apiService";

export default function Services1() {

  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchServices = async () => {
    setIsLoading(true);
    try {
      const endPoint = "/service";
      const response = await apiService.get(endPoint);
      if (response && Array.isArray(response)) {
        setServices(response);
      } else {
        setServices([]);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
      setServices([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [])

  return (
    <section className="section pt-60">
      <div className="container-sub">
        <div className="text-center">
          <h2 className="heading-44-medium wow fadeInUp">Our Services</h2>
        </div>
        <div className="row">
          {services.slice(0, 6).map((elm, i) => (
            <div key={i} className="col-lg-4 col-sm-6 mb-30">
              <div className="cardService wow fadeInUp">
                <div className="cardInfo">
                  <h3 className="cardTitle text-20-medium color-white mb-10">
                    {elm.name}
                  </h3>
                  <div className="box-inner-info">
                    <p className="cardDesc text-14 color-white mb-30">
                      {elm.description}
                    </p>
                    <Link
                      className="cardLink btn btn-arrow-up"
                      href={`/service-single/${elm.id}`}
                    >
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
                <div className="cardImage">
                  <Image
                    width={370}
                    height={400}
                    style={{ height: "fit-content" }}
                    // src={elm.image}
                    src="https://fastly.picsum.photos/id/1043/200/200.jpg?hmac=i7xbST4bM6KMg5XsUaVYvDgwvsZ3VskoXKRqGf1BjcU"
                    alt="Luxride"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* <div className="text-center mt-40 mb-120 wow fadeInUp">
          <nav className="box-pagination">
            <Pagination />
          </nav>
        </div> */}
      </div>
    </section>
  );
}
