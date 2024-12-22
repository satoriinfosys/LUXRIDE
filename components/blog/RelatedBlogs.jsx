import apiService, { BASE_URL } from "@/app/_api/apiService";
// import { blogs } from "@/data/blogs";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function RelatedBlogs() {

  const [blogs, setBlogs] = useState([]); // For locations fetched from API
  const [isLoading, setIsLoading] = useState(false);

  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      const endPoint = "/blog/get-all";
      const response = await apiService.get(endPoint);
      if (response && Array.isArray(response)) {
        setBlogs(response);
      } else {
        setBlogs([]);
      }
    } catch (error) {
      console.error("Error fetching locations:", error);
      setBlogs([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [])

  return (
    <section className="section pt-120 bg-white latest-new-white mb-90">
      <div className="container-sub">
        <h2 className="heading-44-medium color-text mb-60 wow fadeInUp">
          Related Posts
        </h2>
        <div className="row">
          {blogs.slice(0, 3).map((elm, i) => (
            <div key={i} className="col-lg-4">
              <div className="cardNews wow fadeInUp">
                <Link href={`/blog-single/${elm.id}`}>
                  <div className="cardImage">
                    <div className="datePost">
                      <div className="heading-52-medium color-white">
                        {new Date(elm.date).getFullYear()}
                      </div>
                      <p className="text-14 color-white">
                        {new Date(elm.date).toLocaleDateString("en-US", { month: "long" })}
                      </p>
                    </div>
                    <Image
                      width={1104}
                      height={780}
                      style={{ height: "fit-content" }}
                      src={BASE_URL + `/user/image/${elm.bannerImage}`}
                      alt="luxride"
                    />
                  </div>
                </Link>
                <div className="cardInfo">
                  <div className="tags mb-10">
                    <a href="#">{elm.category}</a>
                  </div>
                  <Link className="color-white" href={`/blog-single/${elm.id}`}>
                    <h3 className="text-20-medium color-white mb-20">
                      {elm.title}
                    </h3>
                  </Link>
                  <Link
                    className="cardLink btn btn-arrow-up"
                    href={`/blog-single/${elm.id}`}
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
