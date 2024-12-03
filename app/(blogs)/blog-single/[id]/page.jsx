'use client';
import apiService from "@/app/_api/apiService";
import BlogSingle from "@/components/blog/BlogSingle";
import RelatedBlogs from "@/components/blog/RelatedBlogs";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import MobailHeader1 from "@/components/headers/MobailHeader1";
import { allBlogs } from "@/data/blogs";
import React, { useEffect, useState } from "react";

export default function page({ params }) {

  const [blog, setBlog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      const endPoint = `/blog/${params.id}`;
      const response = await apiService.get(endPoint);
      if (response) {
        setBlog(response);
      } else {
        setBlog([]);
      }
    } catch (error) {
      console.error("Error fetching locations:", error);
      setBlog([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [])

  return (
    <>
      <Header1 /> <MobailHeader1 />
      <main className="main">
        {!isLoading && <BlogSingle blog={blog} />}

        <RelatedBlogs />
      </main>
      <Footer1 />
    </>
  );
}
