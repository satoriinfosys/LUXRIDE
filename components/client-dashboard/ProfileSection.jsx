"use client";
import apiService from "@/app/_api/apiService";
import { useState, useEffect } from "react";

const ProfileSection = ({ profile }) => {
  const [userDetails, setProfile] = useState({ ...profile });
  const [editing, setEditing] = useState(false);
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);


  const countries = ["United States", "Canada", "United Kingdom", "India"];
  const states = {
    "United States": ["California", "New York", "Texas", "Florida"],
    Canada: ["Ontario", "Quebec", "British Columbia", "Alberta"],
    "United Kingdom": ["England", "Scotland", "Wales", "Northern Ireland"],
    India: ["Maharashtra", "Delhi", "Karnataka", "Tamil Nadu"],
  };


  const handleEdit = () => setEditing(true);
  const handleCancel = () => setEditing(false);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await apiService.post(`/user/`, {
        ...userDetails,
        id: profile.id
      })

      setEditing(false);
    } catch (error) {
      setErrorMsg((prevState) => ({ ...prevState, profileError: error?.response?.data?.message || error?.message || "Error while updating profile details" }));
      console.error("Failed to update profile:", error);
    }
  };

  return (
    <>
      <div className="container my-4">
        {/* Card for Profile Information */}
        <div className="card shadow fade-in-up border-0">
          <div className="card-header d-flex align-items-center" style={{ backgroundColor: "#415A77", color: "#fff" }}>
            <i className="bi bi-credit-card-2-front fs-4 me-2"></i>
            <h2 className="fs-5 mb-0">Profile Information</h2>
          </div>


          <div className="card-body bg-light">
            {!editing ? (
              /* READ-ONLY VIEW */
              <div>
                <div className="row mb-3">
                  <div className="col-md-6 mb-3 mb-md-0">
                    <strong>Name:</strong> {profile?.firstName + " " + profile?.lastName}
                  </div>
                  <div className="col-md-6">
                    <strong>Email:</strong> {profile?.email}
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6 mb-3 mb-md-0">
                    <strong>Phone:</strong> {profile?.phone}
                  </div>
                  <div className="col-md-6">
                    <strong>Address:</strong> {profile?.address}
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col-md-6 mb-3 mb-md-0">
                    <strong>Country:</strong> {profile?.country}
                  </div>
                  {/* <div className="col-md-6">
                  <strong>State:</strong> {profile?.state}
                </div> */}
                </div>
                <button onClick={handleEdit} className="btn btn-dark px-4 py-2">
                  Edit Profile
                </button>
              </div>
            ) : (
              /* EDITING VIEW (FORM) */
              <form onSubmit={handleSave}>
                <div className="row g-3">
                  {/* first Name */}
                  <div className="col-md-6">
                    {/* <label className="form-label fw-semibold">Full Name</label> */}
                    <input
                      type="text"
                      value={userDetails?.firstName}
                      onChange={(e) =>
                        setProfile({ ...profile, firstName: e.target.value })
                      }
                      required
                      placeholder="Enter your first name"
                      className="form-control"
                    />
                  </div>

                  <div className="col-md-6">
                    {/* <label className="form-label fw-semibold">Last Name</label> */}
                    <input
                      type="text"
                      value={userDetails?.lastName}
                      onChange={(e) =>
                        setProfile({ ...profile, lastName: e.target.value })
                      }
                      required
                      placeholder="Enter your last name"
                      className="form-control"
                    />
                  </div>

                  {/* Email */}
                  <div className="col-md-6">
                    {/* <label className="form-label fw-semibold">Email</label> */}
                    <input
                      type="email"
                      value={userDetails?.email}
                      onChange={(e) =>
                        setProfile({ ...profile, email: e.target.value })
                      }
                      required
                      placeholder="example@example.com"
                      className="form-control"
                    />
                  </div>

                  {/* Phone */}
                  <div className="col-md-6">
                    {/* <label className="form-label fw-semibold">Phone</label> */}
                    <input
                      type="tel"
                      value={userDetails?.phone}
                      onChange={(e) =>
                        setProfile({ ...profile, phone: e.target.value })
                      }
                      required
                      placeholder="e.g., +1 234 567 8901"
                      className="form-control"
                    />
                  </div>

                  {/* Address */}
                  <div className="col-md-6">
                    {/* <label className="form-label fw-semibold">Address</label> */}
                    <input
                      type="text"
                      value={userDetails?.address}
                      onChange={(e) =>
                        setProfile({ ...profile, address: e.target.value })
                      }
                      required
                      placeholder="Street, Apt, etc."
                      className="form-control"
                    />
                  </div>

                  {/* Country */}
                  <div className="col-md-6">
                    {/* <label className="form-label fw-semibold">Country</label> */}
                    <select
                      value={userDetails?.country}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          country: e.target.value,
                          state: "", // Reset state when country changes
                        })
                      }
                      required
                      className="form-select"
                    >
                      <option value="" disabled>
                        Select Country
                      </option>
                      {countries.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {errorMsg?.profileError && <span className="error-message">{errorMsg.profileError}</span>}


                {/* Buttons */}
                <div className="mt-4 d-flex justify-content-end gap-3">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Inline CSS for a subtle fade-in and card hover effect */}
        <style jsx>{`
        /* Fade in + slide up for the card */
        .fade-in-up {
          animation: fadeInUp 0.7s ease-in-out;
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

        /* Slight hover lift for card */
        .profile-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .profile-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
        }
      `}</style>
      </div>
      <Credentials userId={profile?.id} />
    </>
  );
};

const Credentials = ({ userId }) => {
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await apiService.post(`/auth/change-password`, {
        id: userId,
        oldPassword: oldPassword,
        newPassword: password
      })
    } catch (error) {
      console.error(error)
      setErrorMsg((prevState) => ({ ...prevState, passwordError: error?.response?.data?.message || error?.message || "Error while updating password" }));
      console.error("Failed to update profile:", error);
    }
  };

  return (
    <div className="container my-4">
      {/* Card for Profile Information */}
      <div className="card shadow fade-in-up border-0">
        <div className="card-header d-flex align-items-center" style={{ backgroundColor: "#415A77", color: "#fff" }}>
          <i className="bi bi-credit-card-2-front fs-4 me-2"></i>
          <h2 className="fs-5 mb-0">Security</h2>
        </div>


        <div className="card-body bg-light">
          <form onSubmit={handlePasswordUpdate}>
            <div className="row g-3">
              {/* Password */}
              <div className="col-12">
                <input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="form-control"
                  placeholder="Enter old password"
                  required={true}
                />
              </div>
              <div className="col-12">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  placeholder="Enter new password"
                  required={true}
                />
              </div>
            </div>

            {errorMsg?.passwordError && <span className="error-message">{errorMsg.passwordError}</span>}

            {/* Buttons */}
            <div className="mt-4 d-flex justify-content-end gap-3">
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Inline CSS for a subtle fade-in and card hover effect */}
      <style jsx>{`
        /* Fade in + slide up for the card */
        .fade-in-up {
          animation: fadeInUp 0.7s ease-in-out;
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

        /* Slight hover lift for card */
        .profile-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .profile-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </div>
  );
};

export default ProfileSection;
