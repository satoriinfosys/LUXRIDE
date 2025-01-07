"use client";
import { useState } from "react";

export default function PaymentSection() {
  const [showCardForm, setShowCardForm] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [savedCards, setSavedCards] = useState([]);

  const paymentHistory = [
    { id: 1, carName: "Tesla Model S", amountPaid: "$500", date: "2025-01-01" },
    { id: 2, carName: "BMW 5 Series", amountPaid: "$400", date: "2025-01-10" },
  ];

  const handleAddCard = (e) => {
    e.preventDefault();
    const newCard = {
      id: savedCards.length + 1,
      cardNumber: `**** **** **** ${cardNumber.slice(-4)}`,
      expiryDate,
    };
    setSavedCards([...savedCards, newCard]);
    setCardNumber("");
    setExpiryDate("");
    setCvv("");
    setShowCardForm(false);
    alert("Card information saved successfully!");
  };

  return (
    <div className="container my-4">
      {/* Card for Profile Information */}
      <div className="card shadow fade-in-up border-0">
      <div className="card-header d-flex align-items-center" style={{ backgroundColor: "#415A77", color: "#fff" }}>
                <i className="bi bi-credit-card-2-front fs-4 me-2"></i>
                          <h2 className="fs-4 mb-0">Payment Information</h2>
        </div>

        <div className="card-body bg-light p-4">
  {/* Payment History Section */}
  <div className="mb-4">
    {paymentHistory.length === 0 ? (
      <p className="text-muted">No payment history available.</p>
    ) : (
      <div className="table-responsive">
        <table className="table table-bordered table-hover table-striped align-middle">
          <thead className="table-secondary">
            <tr>
              <th scope="col" style={{ width: "5%" }}>#</th>
              <th scope="col" style={{ width: "25%" }}>Car</th>
              <th scope="col" style={{ width: "25%" }}>Amount Paid</th>
              <th scope="col" style={{ width: "25%" }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {paymentHistory.map((payment, index) => (
              <tr key={payment.id}>
                <td className="text-center fw-bold">{index + 1}</td>
                <td>{payment.carName}</td>
                <td>{payment.amountPaid}</td>
                <td>{payment.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>

  {/* Saved Cards Section */}
  <div className="mb-4">
    <h3 className="fs-5 fw-bold mb-3" style={{ color: "#415A77" }}>Saved Cards</h3>
    {savedCards.length === 0 ? (
      <p className="text-muted">No saved cards available.</p>
    ) : (
      <div className="table-responsive">
        <table className="table table-bordered table-hover table-striped align-middle">
          <thead className="table-secondary">
            <tr>
              <th scope="col" style={{ width: "5%" }}>#</th>
              <th scope="col" style={{ width: "45%" }}>Card Number</th>
              <th scope="col" style={{ width: "25%" }}>Expiry Date</th>
            </tr>
          </thead>
          <tbody>
            {savedCards.map((card, index) => (
              <tr key={card.id}>
                <td className="text-center fw-bold">{index + 1}</td>
                <td>{card.cardNumber}</td>
                <td>{card.expiryDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>

  {/* Add Card Information Button */}
  <button
    onClick={() => setShowCardForm(true)}
    className="btn btn-primary px-4"
  >
    Add Card Information
  </button>
</div>

      </div>

      {/* Card Information Modal Overlay */}
      {showCardForm && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50 p-3 fade-in-up">
          <div
            className="bg-white p-4 rounded shadow"
            style={{ maxWidth: "500px", width: "100%" }}
          >
            <h3 className="text-center fw-bold mb-4">
              <i className="bi bi-plus-circle me-2"></i>Add Card Information
            </h3>
            <form onSubmit={handleAddCard}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Card Number</label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  required
                  className="form-control"
                  placeholder="1234 5678 9012 3456"
                />
              </div>

              <div className="row g-3 mb-3">
                <div className="col-sm-6">
                  <label className="form-label fw-semibold">Expiry Date</label>
                  <input
                    type="text"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    required
                    className="form-control"
                    placeholder="MM/YY"
                  />
                </div>
                <div className="col-sm-6">
                  <label className="form-label fw-semibold">CVV</label>
                  <input
                    type="text"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    required
                    className="form-control"
                    placeholder="123"
                  />
                </div>
              </div>

              <div className="d-flex justify-content-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCardForm(false)}
                  className="btn btn-outline-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-success">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Inline CSS for subtle fade-in animation */}
      <style jsx>{`
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
      `}</style>
    </div>
  );
}
