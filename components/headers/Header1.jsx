"use client";
import { useEffect, useState } from "react";
import Nav from "./components/Nav";

import Image from "next/image";
import Link from "next/link";
import Language from "./components/Language";
import { userLoggedInState } from "@/app/_state/states";
import { useRecoilState } from "recoil";

export default function Header3() {
  const [scrolled, setScrolled] = useState(false);
  const [authUser, setAuthUserDetails] = useRecoilState(userLoggedInState);

  useEffect(() => {
    // Retrieve user details from localStorage
    const savedUserDetails = localStorage.getItem("userDetails");
    if (savedUserDetails) {
      setAuthUserDetails(JSON.parse(savedUserDetails));
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    setAuthUserDetails(null);
    localStorage.setItem("authToken", null);
    Cookies.remove("token", { secure: true, sameSite: "strict" });
    localStorage.removeItem("userDetails");
  }

  return (
    <header
      className={`header header-black-2 sticky-bar ${scrolled ? "stick" : ""}`}
    >
      <div className="container">
        <div className="main-header">
          <div className="header-left">
            <div className="header-logo">
              <Link className="d-flex" href="/">
                <Image
                  width={170}
                  height={50}
                  alt="luxride"
                  src="/assets/imgs/template/logo.svg"
                  style={{ height: "fit-content" }}
                />
              </Link>
            </div>
            <div className="header-nav">
              <nav className="nav-main-menu d-none d-xl-block">
                <ul className="main-menu">
                  <Nav />
                </ul>
              </nav>
              <div className="burger-icon burger-icon-white">
                <span className="burger-icon-mid"></span>
                <span className="burger-icon-bottom"></span>
              </div>
            </div>
            <div className="header-right">
              <div className="d-none d-xxl-inline-block align-middle mr-10">
                <a
                  className="text-14-medium call-phone color-white hover-up"
                  href="tel:+41227157000"
                >
                  +41 22 715 7000
                </a>
              </div>
              <div className="d-none d-xxl-inline-block box-dropdown-cart align-middle mr-10">
                <Language />
              </div>
              {
                !(authUser?.email) ? <>
                  <div className="box-button-login d-inline-block mr-10 align-middle">
                    <Link className="btn btn-default hover-up" href="/login">
                      Log In
                    </Link>
                  </div>
                  <div className="box-button-login d-none2 d-inline-block align-middle">
                    <Link className="btn btn-white hover-up" href="/register">
                      Sign Up
                    </Link>
                  </div>
                </> :
                  <>
                    <div className="box-button-login d-inline-block mr-10 align-middle">
                      <Link className="btn hover-up" href="/dashboard">
                        <div className="text-white p-3 shadow-sm d-inline-block">
                          <span className="font-weight-bold">{authUser?.fullName || "Guest User"}</span>
                        </div>
                      </Link>
                      <button className="btn btn-default hover-up" onClick={handleLogout}>
                        Log Out
                      </button>
                    </div>
                  </>
              }

            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
