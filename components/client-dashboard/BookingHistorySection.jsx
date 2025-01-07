"use client";
import { useState, useEffect } from "react";

const BookingHistorySection = () => {
  const [bookingHistory, setBookingHistory] = useState([]);

  // Function to determine booking status (Completed vs. Pending)
  const getStatus = (booking) => {
    const today = new Date().toISOString().split("T")[0];
    return today > booking.to ? "Completed" : "Pending";
  };

  // Simulate fetching booking history data (replace with a real API call)
  useEffect(() => {
    const fetchBookingHistory = async () => {
      const data = [
        {
          id: 1,
          carName: "Tesla Model S",
          carImage: "/assets/imgs/cars/tesla-model-s.jpg",
          from: "2025-01-01",
          to: "2025-01-05",
          pickupLocation: "New York City",
          dropOffLocation: "Los Angeles",
          message: "Client requested extra luggage space.",
        },
        {
          id: 2,
          carName: "BMW 5 Series",
          carImage: "/assets/imgs/cars/bmw-5-series.jpg",
          from: "2025-01-10",
          to: "2025-01-15",
          pickupLocation: "Chicago",
          dropOffLocation: "Miami",
          message: "Client requested a child seat.",
        },
      ];
      setBookingHistory(data);
    };

    fetchBookingHistory();
  }, []);

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
                  {bookingHistory.map((booking, index) => (
                    <tr key={booking.id}>
                      <td className="text-center fw-bold">{index + 1}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <img
                            src={booking.carImage}
                            alt={booking.carName}
                            className="car-image rounded me-3"
                            style={{
                              width: "60px",
                              height: "60px",
                              objectFit: "cover",
                            }}
                          />
                          <span className="fw-semibold">{booking.carName}</span>
                        </div>
                      </td>
                      <td className="text-center">
                        <span className="badge bg-info text-dark">{booking.from}</span>
                      </td>
                      <td className="text-center">{booking.pickupLocation}</td>
                      <td className="text-center">{booking.dropOffLocation}</td>
                      <td className="text-center">
                        {getStatus(booking) === "Completed" ? (
                          <span className="badge bg-success">Completed</span>
                        ) : (
                          <span className="badge bg-warning">Pending</span>
                        )}
                      </td>
                      <td className="fst-italic text-primary">{booking.message}</td>
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
