"use client";
import { useEffect } from "react";

const generatePlaceholderData = () => {
  const data = [];
  for (let i = 0; i < 12; i++) {
    data.push(Math.floor(Math.random() * 100));
  }
  return data;
};

export default function OverviewSection() {
  useEffect(() => {
    console.log("Placeholder Bar Chart Data:", generatePlaceholderData());
    console.log("Placeholder Line Chart Data:", generatePlaceholderData());
  }, []);

  return (
    <div className="container my-4">
      {/* Main Card for the Overview */}
      <div className="card shadow border-0 fade-in-up" style={{ backgroundColor: "#415A77", color: "#E0E1DD" }}>
        <div className="card-header d-flex align-items-center" style={{ backgroundColor: "#1B263B", color: "#E0E1DD" }}>
          <i className="bi bi-speedometer2 fs-4 me-2"></i>
          <h2 className="mb-0 fs-5">Dashboard Overview</h2>
        </div>
        <div className="card-body" style={{ backgroundColor: "#E0E1DD" }}>
          {/* Row of Statistic Cards */}
          <div className="row g-3 mb-4">
            <div className="col-md-3">
              <div className="card h-100 border-0 shadow-sm stat-card" style={{ backgroundColor: "#1B263B", color: "#E0E1DD" }}>
                <div className="card-body d-flex align-items-center">
                  <i className="bi bi-calendar-check fs-1 me-3"></i>
                  <div>
                    <h5 className="card-title mb-1">Total Bookings</h5>
                    <h6 className="fw-bold mb-0">1,234</h6>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card h-100 border-0 shadow-sm stat-card" style={{ backgroundColor: "#1B263B", color: "#E0E1DD" }}>
                <div className="card-body d-flex align-items-center">
                  <i className="bi bi-currency-dollar fs-1 me-3"></i>
                  <div>
                    <h5 className="card-title mb-1">Total Payments</h5>
                    <h6 className="fw-bold mb-0">$45,000</h6>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card h-100 border-0 shadow-sm stat-card" style={{ backgroundColor: "#1B263B", color: "#E0E1DD" }}>
                <div className="card-body d-flex align-items-center">
                  <i className="bi bi-truck fs-1 me-3"></i>
                  <div>
                    <h5 className="card-title mb-1">Most Booked Car</h5>
                    <h6 className="fw-bold mb-0">Tesla Model S</h6>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card h-100 border-0 shadow-sm stat-card" style={{ backgroundColor: "#1B263B", color: "#E0E1DD" }}>
                <div className="card-body d-flex align-items-center">
                  <i className="bi bi-graph-up-arrow fs-1 me-3"></i>
                  <div>
                    <h5 className="card-title mb-1">Monthly Revenue</h5>
                    <h6 className="fw-bold mb-0">$8,500</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Row with Graphs/Analytics */}
          <div className="row g-4">
            {/* Bar Chart Placeholder */}
            <div className="col-md-6">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-header" style={{ backgroundColor: "#1B263B", color: "#E0E1DD" }}>
                  <h5 className="mb-0">Bookings Bar Chart</h5>
                </div>
                <div className="card-body" style={{ backgroundColor: "#E0E1DD" }}>
                  <div className="chart-placeholder d-flex align-items-center justify-content-center text-muted">
                    <p className="text-center">
                      <i className="bi bi-bar-chart fs-1 mb-2 d-block"></i>
                      <br />
                      (Bar Chart Placeholder)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Line Chart Placeholder */}
            <div className="col-md-6">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-header" style={{ backgroundColor: "#1B263B", color: "#E0E1DD" }}>
                  <h5 className="mb-0">Payments Line Chart</h5>
                </div>
                <div className="card-body" style={{ backgroundColor: "#E0E1DD" }}>
                  <div className="chart-placeholder d-flex align-items-center justify-content-center text-muted">
                    <p className="text-center">
                      <i className="bi bi-activity fs-1 mb-2 d-block"></i>
                      <br />
                      (Line Chart Placeholder)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inline CSS for subtle fade-in animation and placeholders */}
      <style jsx>{`
        .fade-in-up {
          animation: fadeInUp 0.6s ease-in-out;
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

        .chart-placeholder {
          min-height: 200px;
          border: 2px dashed #1b263b;
          border-radius: 6px;
          padding: 1rem;
        }
      `}</style>
    </div>
  );
}