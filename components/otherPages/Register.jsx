"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import apiService from "@/app/_api/apiService";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const router = useRouter();

  const validateForm = () => {
    const errors = {};
    if (!firstName.trim()) errors.firstName = "First Name is required.";
    if (!lastName.trim()) errors.lastName = "Last Name is required.";
    if (!email.trim()) errors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Invalid email format.";
    if (!phone.trim()) errors.phone = "Phone number is required.";
    if (!password.trim()) errors.password = "Password is required.";
    else if (password.length < 6) errors.password = "Password must be at least 6 characters.";
    if (password !== cpassword) errors.cpassword = "Passwords do not match.";
    return errors;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setApiError("");
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      setErrors({});
      const response = await apiService.post("/user", { firstName, lastName, email, phone, password });
      router.push("/login");
    } catch (error) {
      setApiError("Error while registering user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section mt-120 mb-100">
      <div className="container-sub">
        <div className="text-center">
          <h2 className="heading-44-medium wow fadeInUp">Create Account</h2>
          <p className="color-text text-14 wow fadeInUp">
            Sign in with this account across the following sites.
          </p>
        </div>
        <div className="box-login mt-70">
          <div className="form-contact form-comment wow fadeInUp">
            <form onSubmit={(e)=>handleRegister(e)}>
              <div className="row">
                <div className="col-lg-12">
                  <div className={`form-group ${firstName ? "focused" : ""}`}>
                    <label className="form-label" htmlFor="firstName">
                      First Name
                    </label>
                    <input
                      className={`form-control ${firstName ? "filled" : ""}`}
                      id="firstName"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className={`form-group ${lastName ? "focused" : ""}`}>
                    <label className="form-label" htmlFor="lastName">
                      Last Name
                    </label>
                    <input
                      className={`form-control ${lastName ? "filled" : ""}`}
                      id="lastName"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                    {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className={`form-group ${email ? "focused" : ""}`}>
                    <label className="form-label" htmlFor="email">
                      Email
                    </label>
                    <input
                      className={`form-control ${email ? "filled" : ""}`}
                      id="email"
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className={`form-group ${password ? "focused" : ""}`}>
                    <label className="form-label" htmlFor="password">
                      Password
                    </label>
                    <input
                      className={`form-control ${password ? "filled" : ""}`}
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && <span className="error-message">{errors.password}</span>}
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className={`form-group ${cpassword ? "focused" : ""}`}>
                    <label className="form-label" htmlFor="cpassword">
                      Confirm Password
                    </label>
                    <input
                      className={`form-control ${cpassword ? "filled" : ""}`}
                      id="cpassword"
                      type="password"
                      value={cpassword}
                      onChange={(e) => setCpassword(e.target.value)}
                    />
                    {errors.cpassword && <span className="error-message">{errors.cpassword}</span>}
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className={`form-group ${phone ? "focused" : ""}`}>
                    <label className="form-label" htmlFor="phone">
                      Phone
                    </label>
                    <input
                      className={`form-control ${phone ? "filled" : ""}`}
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    {errors.phone && <span className="error-message">{errors.phone}</span>}
                  </div>
                </div>
                <div className="col-lg-12">
                  <button className="btn btn-primary w-100" type="submit" disabled={loading}>
                    {loading ? "Creating Account..." : "Create Account"}
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
                  {apiError && <span className="error-message api-error">{apiError}</span>}
                </div>
                <div className="mt-0 text-center">
                  <span className="text-14-medium color-text">
                    Already a Member?{" "}
                  </span>
                  <a className="text-14-medium color-text" href="/login">
                    Login
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
