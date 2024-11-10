import { bookingDetails } from "@/app/_state/states";
import DatePickerComponent from "@/components/common/DatePicker";
import PlacePicker from "@/components/common/PlacePicker";
import TimePickerComponent from "@/components/common/TimePicker";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useRecoilState } from "recoil";

export default function Hero() {
  const tabs = [
    { id: "distance", label: "Distance" },
    { id: "hourly", label: "Hourly" },
    { id: "rate", label: "Flat Rate" },
  ];

  const [bookingData, setBookingDetails] = useRecoilState(bookingDetails);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const handleSearch = () => {
    // Validate required fields
    let newErrors = {};

    if (!bookingData.from?.name) newErrors.from = "Please enter a starting location.";
    if (!bookingData.to?.name) newErrors.to = "Please enter a destination.";
    if (!bookingData.time) newErrors.time = "Please select a time.";
    if (!bookingData.date) newErrors.date = "Please select a date.";

    setErrors(newErrors);

    // If no errors, proceed with navigation
    if (Object.keys(newErrors).length === 0) {
      // Navigate to the desired route, e.g., `/results`
      router.push(`/booking-vehicle?book=${activeTab}`);
    }
  };

  return (
    <section className="section banner-home2 mb-50">
      <div className="box-banner-homepage-2">
        <div
          className="box-cover-image boxBgImage"
          style={{
            backgroundImage: "url(assets/imgs/page/homepage1/banner3.png)",
          }}
        ></div>
        <div className="box-banner-info">
          <p className="text-16 color-white wow fadeInUp">
            Where Would You Like To Go?
          </p>
          <h2 className="heading-52-medium color-white wow fadeInUp">
            A New Class Of Luxury <br className="d-none d-lg-block" />
            Limo Service
          </h2>
          <div className="mt-20">
            <Link className="btn btn-border wow fadeInUp" href="/fleet-list">
              View Our Fleet
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
        <div className="box-search-ride box-search-ride-style-2 light-input">
          <div className="box-search-tabs wow fadeInUp">
            <div className="head-tabs">
              <ul className="nav nav-tabs nav-tabs-search" role="tablist">
                {tabs.map((tab) => (
                  <li key={tab.id}>
                    <a
                      className={activeTab === tab.id ? "active" : ""}
                      onClick={() => setActiveTab(tab.id)}
                      role="tab"
                      aria-controls={`tab-${tab.id}`}
                      aria-selected={activeTab === tab.id}
                    >
                      {tab.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="tab-content">
              {tabs.map((tab) => (
                <div
                  key={tab.id}
                  className={`tab-pane fade ${
                    activeTab === tab.id ? "active show" : ""
                  }`}
                  id={`tab-${tab.id}`}
                  role="tabpanel"
                  aria-labelledby={`tab-${tab.id}`}
                >
                  <div className="box-form-search">
                    <div className="search-item search-date">
                      <div className="search-icon">
                        <span className="item-icon icon-date"> </span>
                      </div>
                      <div className="search-inputs">
                        <label className="text-14 color-grey">Date</label>
                        <DatePickerComponent />
                        {errors.date && <p className="error">{errors.date}</p>}
                      </div>
                    </div>
                    <div className="search-item search-time">
                      <div className="search-icon">
                        <span className="item-icon icon-time"> </span>
                      </div>
                      <div className="search-inputs">
                        <label className="text-14 color-grey">Time</label>
                        <TimePickerComponent />
                        {errors.time && <p className="error">{errors.time}</p>}
                      </div>
                    </div>
                    <div className="search-item search-from">
                      <div className="search-icon">
                        <span className="item-icon icon-from"> </span>
                      </div>
                      <div className="search-inputs">
                        <label className="text-14 color-grey">From</label>
                        <PlacePicker type="from" />
                        {errors.from && <p className="error">{errors.from}</p>}
                      </div>
                    </div>
                    <div className="search-item search-to">
                      <div className="search-icon">
                        <span className="item-icon icon-to"> </span>
                      </div>
                      <div className="search-inputs">
                        <label className="text-14 color-grey">To</label>
                        <PlacePicker type="to" />
                        {errors.to && <p className="error">{errors.to}</p>}
                      </div>
                    </div>
                    <div className="search-item search-button mb-0">
                      <button className="btn btn-search" onClick={handleSearch} type="submit">
                        <Image
                          width={20}
                          height={20}
                          src="/assets/imgs/template/icons/search.svg"
                          alt="luxride"
                        />
                        Search
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
