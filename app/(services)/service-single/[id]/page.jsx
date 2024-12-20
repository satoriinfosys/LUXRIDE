'use client';
import apiService from "@/app/_api/apiService";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import MobailHeader1 from "@/components/headers/MobailHeader1";
import Breadcumb from "@/components/service/serviceSingle/Breadcumb";
import Features1 from "@/components/service/serviceSingle/Features1";
import Features2 from "@/components/service/serviceSingle/Features2";
import SearchBox from "@/components/service/serviceSingle/SearchBox";
import { allServices } from "@/data/services";
import React, { useEffect, useState } from "react";

export default function page({ params }) {
  const [service, setService] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchService = async () => {
    setIsLoading(true);
    try {
      const endPoint = `/service/${params.id}`;
      const response = await apiService.get(endPoint);
      if (response) {
        setService(response);
      } else {
        setService([]);
      }
    } catch (error) {
      console.error("Error fetching service:", error);
      setService([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchService();
  }, [])

  return (
    <>
      <Header1 /> <MobailHeader1 />
      <main className="main">
        <Breadcumb service={service} />
        {/* <SearchBox service={service} /> */}
        <Features1 service={service} />
        <Features2 service={service} />
      </main>
      <Footer1 />
    </>
  );
}
