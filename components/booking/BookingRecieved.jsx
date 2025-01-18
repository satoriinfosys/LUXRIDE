"use client";
import { BASE_URL } from "@/app/_api/apiService";
import { reservationDetails } from "@/app/_state/states";
import Image from "next/image";
import { useRecoilState } from "recoil";
import jsPDF from "jspdf";

export default function BookingRecieved() {
  const [reservationData, setReservationData] = useRecoilState(reservationDetails);

  const infoData = [
    { id: 1, label: "Reservation Id", value: reservationData?.id },
    {
      id: 2,
      label: "Date",
      value: reservationData?.createdAt
        ? new Date(reservationData.createdAt).toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "N/A",
    },
    { id: 3, label: "Total", value: "$ " + parseFloat(reservationData?.paymentAmount).toFixed(2) },
    { id: 4, label: "Payment Method", value: reservationData?.paymentType || "Card" },
  ];

  const rideData = [
    {
      id: 1,
      topText: "Pick Up Address",
      bottomText: reservationData?.pickUpLocation,
    },
    {
      id: 2,
      topText: "Drop Off Address",
      bottomText: reservationData?.dropOffLocation,
    },
    {
      id: 3,
      topText: "Pick Up Date",
      bottomText: reservationData?.pickUpDate
        ? new Date(reservationData.pickUpDate).toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "N/A",
    },
    {
      id: 4,
      topText: "Pick Up Time",
      bottomText: reservationData?.pickUpTime
        ? new Date(reservationData.pickUpTime).toLocaleString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })
        : "N/A",
    },
    { id: 5, topText: "Distance", bottomText: reservationData?.totalDistance },
    { id: 6, topText: "Time", bottomText: reservationData?.totalHour + " Hr" },
  ];

  const personalData = [
    { id: 1, topText: "First name", bottomText: reservationData?.firstName },
    { id: 2, topText: "Last name", bottomText: reservationData?.lastName },
    { id: 3, topText: "Email", bottomText: reservationData?.email },
    { id: 4, topText: "Phone", bottomText: reservationData?.phone },
    { id: 10, topText: "Country", bottomText: "USA" },
    { id: 11, topText: "Special Requirements", bottomText: reservationData?.clientRequest },
  ];

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Reservation Details", 10, 10);

    doc.setFontSize(12);
    infoData.forEach((info, index) => {
      doc.text(`${info.label}: ${info.value}`, 10, 20 + index * 10);
    });

    doc.text("Ride Information", 10, 70);
    rideData.forEach((ride, index) => {
      doc.text(`${ride.topText}: ${ride.bottomText}`, 10, 80 + index * 10);
    });

    doc.text("Passenger Information", 10, 140);
    personalData.forEach((person, index) => {
      doc.text(`${person.topText}: ${person.bottomText}`, 10, 150 + index * 10);
    });

    doc.text("Selected Car", 10, 210);
    doc.text(`Model: ${reservationData?.car?.model || "N/A"}`, 10, 220);
    doc.text(`Car: ${reservationData?.car?.name || "N/A"}`, 10, 230);

    // Save the PDF
    doc.save("ReservationDetails.pdf");
  };

  return (
    <section className="section">
      <div className="container-sub">
        <div className="box-completed-booking">
          <div className="text-center wow fadeInUp">
            <Image
              width={80}
              height={80}
              className="mb-20"
              src="/assets/imgs/page/booking/completed.png"
              alt="luxride"
            />
            <h4 className="heading-24-medium color-text mb-10">
              Hi, your reservation was completed successfully!
            </h4>
            <p className="text-14 color-grey mb-40">
              Booking details have been sent to: {reservationData?.email}
            </p>
          </div>
          <div className="box-info-book-border wow fadeInUp">
            {infoData.map((elm, i) => (
              <div key={i} className="info-1">
                <span className="color-text text-14">{elm.label}</span>
                <br />
                <span className="color-text text-14-medium">{elm.value}</span>
              </div>
            ))}
          </div>

          <div className="box-booking-border wow fadeInUp">
            <h6 className="heading-20-medium color-text">
              Reservation Information
            </h6>
            <ul className="list-prices">
              {rideData.map((elm, i) => (
                <li key={i}>
                  <span className="text-top">{elm.topText}</span>
                  <span className="text-bottom">{elm.bottomText}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="box-booking-border wow fadeInUp">
            <h6 className="heading-20-medium color-text">Selected Car</h6>
            <div className="mt-20 mb-20 text-center">
              <Image
                width={1530}
                height={711}
                style={{ height: "fit-content" }}
                src={BASE_URL + `/user/image/${reservationData?.car?.detailImage}`}
                alt="luxride"
              />
            </div>
            <ul className="list-prices">
              <li>
                <span className="text-top">Model</span>
                <span className="text-bottom">{reservationData?.car?.model}</span>
              </li>
              <li>
                <span className="text-top">Car</span>
                <span className="text-bottom">{reservationData?.car?.name}</span>
              </li>
            </ul>
          </div>
          <div className="box-booking-border wow fadeInUp">
            <h6 className="heading-20-medium color-text">
              Passenger Information
            </h6>
            <ul className="list-prices">
              {personalData.map((elm, i) => (
                <li key={i}>
                  <span className="text-top">{elm.topText}</span>
                  <span className="text-bottom">{elm.bottomText}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="text-center mt-30">
            <button className="btn btn-primary" onClick={generatePDF}>
              Download Reservation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
