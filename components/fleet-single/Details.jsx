"use client";
import { useEffect } from "react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { addLeftPaddingSwiper } from "@/utlis/addSwiperPadding";
import Image from "next/image";
import { BASE_URL } from "@/app/_api/apiService";
import Link from "next/link";
import { userLoggedInState } from "@/app/_state/states";
import { useRecoilState } from "recoil";


export default function Details({ car }) {

  const [authUser, setAuthUserDetails] = useRecoilState(userLoggedInState);

  useEffect(() => {
    addLeftPaddingSwiper();
  }, []);

  const settings = {
    spaceBetween: 30,
    slidesPerView: 4,
    slidesPerGroup: 1,
    // initialSlide: 1,
    loop: true,
    navigation: {
      nextEl: ".snbn31",
      prevEl: ".snbp31",
    },
    modules: [Autoplay, Navigation],
    autoplay: {
      delay: 10000,
    },

    breakpoints: {
      1399: {
        slidesPerView: 2,
      },
      1100: {
        slidesPerView: 2,
      },
      670: {
        slidesPerView: 2,
      },
      575: {
        slidesPerView: 1,
      },
      400: {
        slidesPerView: 1,
      },
      350: {
        slidesPerView: 1,
      },
      150: {
        slidesPerView: 1,
      },
    },
  };

  const slideImages = [
    BASE_URL + `/user/image/${car?.image}`,
    BASE_URL + `/user/image/${car?.detailImage}`
  ];

  return (
    <section className="section">
      <Image
        width={1920}
        height={560}
        style={{ height: "fit-content" }}
        className=""
        src={BASE_URL + `/user/image/${car?.detailImage}`}
        alt="luxride"
      />
      <div className="container-sub">
        <div className="mt-120">
          <h2 className="heading-44-medium mb-30 color-text title-fleet wow fadeInUp">
            {car?.model}
          </h2>
          <div className="content-single wow fadeInUp">
            <p>
              {car?.description}
            </p>
            {/* <p>
              Et, morbi at sagittis vehicula rutrum. Lacus tortor, quam arcu mi
              et, at lectus leo nunc. Mattis cras auctor vel pharetra tempor.
              Rhoncus pellentesque habitant ac tempor. At aliquam euismod est in
              praesent ornare etiam id. Faucibus libero sit vehicula sed
              condimentum. Vitae in nam porttitor rutrum sed aliquam donec sed.
              Sapien facilisi lectus.
            </p> */}
            {car?.features?.length && <h6 className="heading-24-medium color-text mb-30">We offer</h6>}
            <ul className="list-ticks list-ticks-small">
              {car?.features?.length && car?.features?.map((elm, i) => (<li key={i} className="text-16 mb-20">{elm.name || elm}</li>))}
              {/* <li className="text-16 mb-20">100% Luxurious Fleet</li>
              <li className="text-16 mb-20">
                All Our Fleet Are Fully Valeted & Serviced
              </li>
              <li className="text-16 mb-20">A Safe & Secure Journey</li>
              <li className="text-16 mb-20">Comfortable And Enjoyable</li>
              <li className="text-16 mb-20">Clean, Polite & Knowledgeable</li> */}
            </ul>
            <div className="mt-30">
              <a className="btn btn-primary btn-book" href={authUser?.email ? '/' : '/login'}>
                Book Now
                <svg
                  className="icon-16 ml-5"
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
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="box-slide-fleet mt-120 wow fadeInUp">
        <div className="box-swiper">
          <Swiper
            style={{ maxWidth: "100vw", overflow: "hidden" }}
            {...settings}
            className="swiper-container swiper-group-2-single-fleet pb-0"
          >
            {slideImages.map((elm, i) => (
              <SwiperSlide key={i} className="swiper-slide">
                <Image
                  width={870}
                  height={600}
                  style={{ height: "fit-content" }}
                  src={elm}
                  alt="luxride"
                />
              </SwiperSlide>
            ))}

            <div className="box-pagination-fleet">
              <div className="swiper-button-prev swiper-button-prev-fleet snbp31">
                <svg
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
                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                  ></path>
                </svg>
              </div>
              <div className="swiper-button-next swiper-button-next-fleet snbn31">
                <svg
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
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  ></path>
                </svg>
              </div>
            </div>
          </Swiper>
        </div>
      </div>
    </section>
  );
}
