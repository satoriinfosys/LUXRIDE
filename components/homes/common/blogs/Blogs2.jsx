'use client';
import { useEffect, useState } from "react";
import apiService from "@/app/_api/apiService";
import Image from "next/image";
import Link from "next/link";

export default function Blogs() {

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
    <section className="section pt-120 pb-90 bg-primary">
      <div className="container-sub">
        <div className="row align-items-center">
          <div className="col-lg-6 col-7">
            <h2 className="heading-44-medium color-white wow fadeInUp">
              Latest From Blogs
            </h2>
          </div>
          <div className="col-lg-6 col-5 text-end">
            <Link
              className="text-16-medium color-white hover-up d-inline-block wow fadeInUp"
              href="/blog-grid"
            >
              More Blogs
              <svg
                className="icon-16 color-white"
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
          {blogs.map((elm, i) => (
            <div key={i} className="col-lg-4">
              <div className="cardNews wow fadeInUp">
                <Link href={`/blog-single/${elm.id}`}>
                  <div className="cardImage">
                    {/* <div className="datePost">
                      <div className="heading-52-medium color-white">
                        {elm.date}.
                      </div>
                      <p className="text-14 color-white">{elm.monthYear}</p>
                    </div> */}
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
                      // src={elm.imageSrc}
                      style={{ height: "fit-content" }}
                      alt="luxride"
                      src="https://fastly.picsum.photos/id/1043/200/200.jpg?hmac=i7xbST4bM6KMg5XsUaVYvDgwvsZ3VskoXKRqGf1BjcU"
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
