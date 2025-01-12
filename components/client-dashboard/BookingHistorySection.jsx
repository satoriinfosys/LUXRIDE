"use client";
import apiService, { BASE_URL } from "@/app/_api/apiService";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";

const BookingHistorySection = ({ profile }) => {
  const [bookingHistory, setBookingHistory] = useState([]);

  useEffect(() => {
    fetchBookingHistory();
  }, []);

  const fetchBookingHistory = async () => {
    const token = Cookies.get("token");
    try {
      const bookingHistory = await apiService.post(
        '/reservation/user',
        {
          status: true,
          sort: "DESC",
          limit: 10,
          page: 1,
          userId: profile.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Booking History:", bookingHistory.data);
      setBookingHistory(bookingHistory.data)
    } catch (error) {
      console.error("Error fetching booking history:", error.response?.data || error.message);
    }
  }


  return (
    <div className="container my-4">
      {/* Main Card */}
      <div className="card shadow fade-in-up border-0">
        <div
          className="card-header d-flex align-items-center"
          style={{ backgroundColor: "#415A77", color: "#fff" }}
        >
          <i className="bi bi-calendar2-check fs-4 me-2"></i>
          <h2 className="fs-5 mb-0">Booking History</h2>
        </div>

        <div className="card-body bg-light">
          {bookingHistory.length === 0 ? (
            <p className="text-muted">You have no past bookings.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered table-hover table-striped align-middle">
                <thead className="table-secondary">
                  <tr>
                    <th scope="col" style={{ width: "5%" }}>S.N</th>
                    <th scope="col" style={{ width: "20%" }}>Car</th>
                    <th scope="col" style={{ width: "10%" }}>Booking Date</th>
                    <th scope="col" style={{ width: "15%" }}>Pickup Location</th>
                    <th scope="col" style={{ width: "15%" }}>Drop-off Location</th>
                    <th scope="col" style={{ width: "10%" }}>Status</th>
                    <th scope="col" style={{ width: "25%" }}>Client Message</th>
                  </tr>
                </thead>
                <tbody>
                  {bookingHistory?.map((booking, index) => (
                    <tr key={index}>
                      <td className="text-center fw-bold">{index + 1}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <img
                            src={BASE_URL + `/user/image/${booking.car.image}`}
                            alt={booking.car.name}
                            className="car-image rounded me-3"
                            style={{
                              width: "60px",
                              height: "60px",
                              objectFit: "cover",
                            }}
                          />
                          <span className="fw-semibold">{booking.car.name}</span>
                        </div>
                      </td>
                      <td className="text-center">
                        <span className="badge bg-info text-dark">{new Date(booking.createdAt).toLocaleString("en-US")}</span>
                      </td>
                      <td className="text-center">{booking.pickUpLocation}</td>
                      <td className="text-center">{booking.dropOffLocation}</td>
                      <td className="text-center">
                        {booking.reservationApproval !== "completed" ? (
                          <span className="badge bg-warning">{booking.reservationApproval}</span>
                        ) : (
                          <span className="badge bg-success">{booking.reservationApproval}</span>
                        )}
                      </td>
                      <td className="fst-italic text-primary">{booking.clientRequest}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Inline CSS for hover effects & simple fade-in animation */}
      <style jsx>{`
        .fade-in-up {
          animation: fadeInUp 0.8s ease-in-out;
        }

        @keyframes fadeInUp {
          0% {
            transform: translateY(20px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .card {
          transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
        }
        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
        }

        .car-image {
          transition: transform 0.3s ease-in-out;
        }
        .car-image:hover {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
};

export default BookingHistorySection;
