"use client";
import apiService from "@/app/_api/apiService";
import { userLoggedInState } from "@/app/_state/states";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useRecoilState } from "recoil";
import Cookies from "js-cookie";

export default function Login() {
  const router = useRouter();

  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [authUser, setAuthUserDetails] = useRecoilState(userLoggedInState);


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await apiService.post("/auth/login", { email: emailValue, password: passwordValue });
      localStorage.setItem("authToken", response.data.token);

      Cookies.set("token", response.data.token, {
        expires: 1, // Expires in 1 day
        secure: true, // Use HTTPS
        sameSite: "strict", // CSRF protection
      });

      // Save user details in localStorage
      const userDetails = {
        email: response.data.email,
        phone: response.data.phone,
        fullName: response.data.fullName,
        userId: response.data.userId
      };

      localStorage.setItem("userDetails", JSON.stringify(userDetails));

      setAuthUserDetails((prevState) => ({
        ...prevState,
        email: response.data.email,
        phone: response.data.phone,
        fullName: response.data.fullName,
        userId: response.data.userId
      }));
      router.push("/");
    }
    catch (error) {
      localStorage.setItem("authToken", null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="section mt-120 mb-100">
      <div className="container-sub">
        <div className="text-center">
          <h2 className="heading-44-medium wow fadeInUp">Sign in</h2>
          <p className="color-text text-14 wow fadeInUp">
            Sign in with this account across the following sites.
          </p>
        </div>
        <div className="box-login mt-70">
          <div className="form-contact form-comment wow fadeInUp">
            <form onSubmit={(e) => handleLogin(e)}>
              <div className="row">
                <div className="col-lg-12">
                  <div className={`form-group ${emailValue ? "focused" : ""}`}>
                    <label className="form-label" htmlFor="fullname">
                      Email
                    </label>
                    <input
                      className={`form-control ${emailValue ? "filled" : ""}`}
                      id="fullname"
                      type="text"
                      value={emailValue}
                      onChange={(e) => setEmailValue(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div
                    className={`form-group ${passwordValue ? "focused" : ""}`}
                  >
                    <label className="form-label" htmlFor="email">
                      Password
                    </label>
                    <input
                      className={`form-control ${passwordValue ? "filled" : ""
                        }`}
                      id="email"
                      type="password"
                      value={passwordValue}
                      onChange={(e) => setPasswordValue(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="mb-20">
                    <div className="d-flex justify-content-between">
                      <label className="text-14 color-text">
                        <input className="cb-rememberme" type="checkbox" />
                        Remember me{" "}
                      </label>
                      <a className="text-14 color-text" href="#">
                        Lost your password?
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <button className="btn btn-primary w-100" type="submit" disabled={loading}>
                    Sign in
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
                  </button>
                </div>
                {/* <div className="col-lg-12">
                  <div className="text-or-box">
                    <span className="text-or">OR</span>
                  </div>
                  <div className="mb-20">
                    <a className="btn btn-login-google" href="#">
                      Continue Google
                    </a>
                  </div>
                  <div className="mb-20">
                    <a className="btn btn-login-facebook" href="#">
                      Continue Facebook
                    </a>
                  </div>
                  <div className="mb-20">
                    <a className="btn btn-login-apple" href="#">
                      Continue Apple
                    </a>
                  </div>
                </div> */}
                <div className="mt-0 text-center">
                  <span className="text-14-medium color-text">
                    Not signed up?{" "}
                  </span>
                  <a className="text-14-medium color-text" href="/register">
                    Create an account.
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
