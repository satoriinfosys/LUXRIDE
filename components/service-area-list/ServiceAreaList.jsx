"use client";
import { useEffect, useState } from "react";
import Pagination from "../common/Pagination";
import { carBrands, carTypes, cars } from "@/data/cars";
import Image from "next/image";
import Link from "next/link";
import apiService from "@/app/_api/apiService";

export default function ServiceAreaList() {
  const [serviceAreas, setServiceAreas] = useState([]);
  const [selectedServiceArea, setServiceArea] = useState(cars);

  const [isLoading, setIsLoading] = useState(false);

  const fetchServiceArea = async () => {
    setIsLoading(true);
    try {
      const endPoint = "/serviceArea";
      const response = await apiService.get(endPoint);

      if (response && Array.isArray(response)) {
        setServiceAreas(response);
      } else {
        setServiceAreas([]);
      }
    } catch (error) {
      console.error("Error fetching locations:", error);
      setServiceAreas([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServiceArea();
  }, [])

  return (
    <section className="section pt-60 bg-white latest-new-white">
      <div className="container-sub">
        <div className="row align-items-center">
          <div className="col-lg-6 col-md-6 col-sm-6 text-center text-sm-start mb-30">
            <h2 className="heading-24-medium wow fadeInUp">
              Service Areas
            </h2>
          </div>
        </div>
        <div className="row mt-30">
          {serviceAreas?.map((elm, i) => (
            <div key={i} className="col-lg-4 mb-30">
              <div className="cardFleet wow fadeInUp">
                <div className="cardInfo">
                  {/* <Link href={`/service-area-single/${elm.id}`}> */}
                  <h3 className="text-20-medium color-text mb-10">
                    {elm.name}
                  </h3>
                  {/* </Link> */}
                  <p className="text-14 color-text mb-30">{elm.description}</p>
                </div>
                <div className="cardImage mb-30">
                  {/* <Link href={`/service-area-single/${elm.id}`}> */}
                  <Image
                    width={1530}
                    height={711}
                    style={{ height: "fit-content" }}
                    src={elm.imgSrc}
                    alt="Luxride"
                  />
                  {/* </Link> */}
                </div>
                <div className="cardInfoBottom">
                  {elm.isAirportService &&
                    <div className="passenger">
                      <span className="icon-circle icon-passenger"></span>
                      <span className="text-14">
                        <span>Airport Service</span>
                      </span>
                    </div>}

                  {/* <div className="luggage">
                    <span className="icon-circle icon-luggage"></span>
                    <span className="text-14">
                      Luggage<span>{elm.luggage}</span>
                    </span>
                  </div> */}
                </div>
              </div>
            </div>
          ))}
          {!selectedServiceArea.length && <div>No item found. Try another filter</div>}
        </div>
        <div className="text-center mt-40 mb-120">
          <nav className="box-pagination">
            <Pagination />
          </nav>
        </div>
      </div>
    </section>
  );
}
