"use client";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { userLoggedInState } from "@/app/_state/states";
import { useRecoilState } from "recoil";

export default function DashboardLayout({ activeSection, setActiveSection, userDetails, children }) {
  const router = useRouter(); // Initialize the router
  const [authUser, setAuthUserDetails] = useRecoilState(userLoggedInState);


  const menuItems = [
    { id: "overview", label: "Overview", icon: "bi-speedometer2" },
    { id: "profile", label: "Profile", icon: "bi-person-circle" },
    { id: "history", label: "Booking History", icon: "bi-clock-history" },
    { id: "payment", label: "Payment Info", icon: "bi-credit-card-2-front" },
  ];

  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1920);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isTabletOrUp = windowWidth >= 768;

  const handleLogout = () => {
    localStorage.setItem("authToken", null);
    Cookies.remove("token", { secure: true, sameSite: "strict" });
    localStorage.removeItem("userDetails");
    setAuthUserDetails(null);
    router.push("/");
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-md navbar-dark shadow" style={{ backgroundColor: "#121211" }}>
        <div className="container-fluid">
          <a className="navbar-brand fw-bold d-flex align-items-center" href="/">
            <i className="bi bi-gem fs-4 me-2 text-warning"></i> Super Car Deluxe
          </a>
          <div className="d-none d-md-block text-white mx-4">
            Welcome, <span className="fw-semibold">{userDetails?.firstName}</span>!
          </div>
          {!isTabletOrUp && (
            <button
              className="navbar-toggler border-0"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNav"
              aria-controls="offcanvasNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          )}
        </div>
      </nav>

      <div className="flex-grow-1 d-flex">
        {/* SIDEBAR */}
        {isTabletOrUp ? (
          <div className="pinned-sidebar text-white d-flex flex-column" style={{ width: "240px" }}>
            <div className="px-3 py-4" style={{ backgroundColor: "#00000" }}>
              <div className="fw-bold text-white-50">Hello, {userDetails?.firstName}!</div>
            </div>
            <div className="flex-grow-1 px-2 py-3" style={{ backgroundColor: "#010003" }}>
              <ul className="nav nav-pills flex-column gap-2">
                {menuItems.map((item) => (
                  <li key={item.id} className="nav-item">
                    <button
                      className={`nav-link d-flex align-items-center gap-2 w-100 ${activeSection === item.id ? "active" : ""
                        }`}
                      style={activeSection === item.id ? activeLinkStyle : linkStyle}
                      onClick={() => setActiveSection(item.id)}
                    >
                      <i className={`bi ${item.icon} fs-5`}></i>
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Logout Button */}
            <div className="mt-auto px-3 py-3" style={{ paddingBottom: "20px" }}>
              <button
                className="btn fw-bold w-100 text-white"
                style={{ backgroundColor: "#000", borderRadius: "5px", padding: "10px 16px" }}
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <OffCanvasNav
            userName={userDetails?.firstName}
            menuItems={menuItems}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            setAuthUserDetails={setAuthUserDetails}
          />
        )}

        {/* MAIN CONTENT AREA */}
        <div className="flex-grow-1 p-4 fade-in-up" style={{ background: "#f5f5fa" }}>
          <div
            className="bg-white rounded shadow-sm d-flex align-items-center justify-content-between p-3 mb-4"
            style={{ borderLeft: "5px solid #000" }}
          >
            <h1 className="h5 mb-0">
              {menuItems.find((m) => m.id === activeSection)?.label || "Dashboard"}
            </h1>
            <i className="bi bi-emoji-smile fs-3 text-primary"></i>
          </div>

          <div className="bg-white rounded shadow-sm p-4" style={{ minHeight: "60vh" }}>
            {children}
          </div>
        </div>
      </div>

      <footer className="text-center py-2" style={{ backgroundColor: "#EDE7F6", fontSize: "0.875rem" }}>
        <small className="text-secondary">
          &copy; {new Date().getFullYear()} Super Car Deluxe Nyc @2025. All rights reserved.
        </small>
      </footer>

      <style jsx>{`
        .offcanvas.offcanvas-end {
          width: 220px !important;
          background-color: rgb(24, 23, 26);
        }
        .fade-in-up {
          animation: fadeInUp 0.5s ease-in-out;
        }
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(15px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .pinned-sidebar {
          background-color: rgba(22, 21, 24, 0.83);
          color: #fff;
          min-height: calc(100vh - 56px);
        }
        .nav-link {
          padding: 10px 12px;
          border-radius: 5px;
        }
        .nav-link.active {
          background-color: #bcbcc4 !important;
          color: #000 !important;
        }
        .nav-link:hover {
          background-color: #4a4a50;
          color: #fff;
        }
        .pinned-sidebar .btn:hover {
          background-color: #3c3c41;
          color: #fff;
        }
      `}</style>
    </div>
  );
}

/* OffCanvasNav Component */
function OffCanvasNav({ userName, menuItems, activeSection, setActiveSection, setAuthUserDetails }) {
  const router = useRouter(); // Initialize the router


  const handleLogout = () => {
    localStorage.setItem("authToken", null);
    Cookies.remove("token", { secure: true, sameSite: "strict" });
    localStorage.removeItem("userDetails");
    setAuthUserDetails(null);
    router.push("/");
  }

  return (
    <div className="offcanvas offcanvas-end text-bg-dark" tabIndex="-1" id="offcanvasNav">
      <div className="offcanvas-header" style={{ backgroundColor: "#0a0a0a" }}>
        <h5 className="offcanvas-title">
          <i className="bi bi-gem me-2 text-warning"></i> Super Car Deluxe
        </h5>
        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas"></button>
      </div>

      <div className="offcanvas-body d-flex flex-column px-2 py-3">
        <div className="mb-4">
          <span className="text-white-50">Welcome, {userName}!</span>
        </div>

        <ul className="nav nav-pills flex-column gap-2">
          {menuItems.map((item) => (
            <li key={item.id} className="nav-item">
              <button
                className={`nav-link d-flex align-items-center gap-2 w-100 ${activeSection === item.id ? "active" : ""
                  }`}
                style={activeSection === item.id ? activeLinkStyle : linkStyle}
                onClick={() => {
                  setActiveSection(item.id);
                  const offCanvasElement = document.getElementById("offcanvasNav");
                  if (offCanvasElement) {
                    const offCanvas = bootstrap.Offcanvas.getInstance(offCanvasElement);
                    offCanvas?.hide();
                  }
                }}
              >
                <i className={`bi ${item.icon} fs-5`}></i>
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Logout Button */}
        <button
          className="btn fw-bold mt-4 w-100 text-white"
          style={{ backgroundColor: "#000", borderRadius: "5px", padding: "10px 16px" }}
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

/* Link Styles */
const linkStyle = {
  backgroundColor: "transparent",
  color: "#ffffff",
  padding: "10px 12px",
  borderRadius: "5px",
};

const activeLinkStyle = {
  backgroundColor: "#bcbcc4",
  color: "#000",
  padding: "10px 12px",
  borderRadius: "5px",
};
