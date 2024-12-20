'use client';
import apiService from "@/app/_api/apiService";
import BreadCumb from "@/components/fleet-list/BreadCumb";
import BookSection from "@/components/fleet-single/BookSection";
import BusnessClassFleet from "@/components/fleet-single/BusnessClassFleet";
import Details from "@/components/fleet-single/Details";
import Features from "@/components/fleet-single/Features";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import MobailHeader1 from "@/components/headers/MobailHeader1";
import { cars } from "@/data/cars";
import React, { useEffect, useState } from "react";

export default function page({ params }) {
  const [car, setCar] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchFleet = async () => {
    setIsLoading(true);
    try {
      const endPoint = `/cars/${params.id}`;
      const response = await apiService.get(endPoint);
      if (response) {
        setCar(response);
      } else {
        setCar([]);
      }
    } catch (error) {
      console.error("Error fetching car:", error);
      setCar([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFleet();
  }, [])

  return (
    <>
      <Header1 /> <MobailHeader1 />
      <main className="main">
        <BreadCumb />
        <Details car={car} />
        <Features />
        {/* <BookSection car={car} /> */}
        {/* <BusnessClassFleet /> */}
      </main>
      <Footer1 />
    </>
  );
}
