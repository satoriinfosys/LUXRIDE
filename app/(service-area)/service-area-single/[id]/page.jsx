'use client';
import apiService from "@/app/_api/apiService";
import BreadCumb from "@/components/fleet-list/BreadCumb";
import Details from "@/components/fleet-single/Details";
import Features from "@/components/fleet-single/Features";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import MobailHeader1 from "@/components/headers/MobailHeader1";
import React, { useEffect, useState } from "react";

export default function page({ params }) {
  const [serviceArea, setServiceArea] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchServiceArea = async () => {
    setIsLoading(true);
    try {
      const endPoint = `/service/${params.id}`;
      const response = await apiService.get(endPoint);
      if (response) {
        setServiceArea(response);
      } else {
        setServiceArea([]);
      }
    } catch (error) {
      console.error("Error fetching service area:", error);
      setServiceArea([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServiceArea();
  }, [])

  return (
    <>
      <Header1 /> <MobailHeader1 />
      <main className="main">
        <BreadCumb />
        <Details serviceArea={serviceArea} />
        <Features />
      </main>
      <Footer1 />
    </>
  );
}
