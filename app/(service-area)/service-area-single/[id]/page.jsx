'use client';
import apiService from "@/app/_api/apiService";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import MobailHeader1 from "@/components/headers/MobailHeader1";
import Breadcumb from "@/components/service-area-single/Breadcumb";
import Features1 from "@/components/service-area-single/Features1";
import Features2 from "@/components/service-area-single/Features2";
import React, { useEffect, useState } from "react";

export default function page({ params }) {
  const [serviceArea, setServiceArea] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchServiceArea = async () => {
    setIsLoading(true);
    try {
      const endPoint = `/serviceArea/${params.id}`;
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
        <Breadcumb serviceArea={serviceArea} />
        {/* <Features1 serviceArea={serviceArea} /> */}
        <Features2 serviceArea={serviceArea} />
      </main>
      <Footer1 />
    </>
  );
}
