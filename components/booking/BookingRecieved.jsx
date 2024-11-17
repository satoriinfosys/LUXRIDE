'use client';
import { reservationDetails } from "@/app/_state/states";
import Image from "next/image";
import { useRecoilState } from "recoil";


export default function BookingRecieved() {
  const [reservationData, setReservationData] = useRecoilState(reservationDetails);

  const infoData = [
    { id: 1, label: "Rservation Id", value: reservationData?.id },
    {
      id: 2, label: "Date", value: reservationData?.createdAt
        ? new Date(reservationData.createdAt).toLocaleString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
        : "N/A",
    },
    { id: 3, label: "Total", value: "$ " + reservationData?.paymentAmount },
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
      id: 3, topText: "Pick Up Date", bottomText: reservationData?.pickUpDate
        ? new Date(reservationData.pickUpDate).toLocaleString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
        : "N/A",
    },
    {
      id: 4, topText: "Pick Up Time", bottomText: reservationData?.pickUpTime
        ? new Date(reservationData.pickUpTime).toLocaleString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        })
        : "N/A"
    },
    { id: 5, topText: "Distance", bottomText: reservationData?.totalDistance },
    { id: 6, topText: "Time", bottomText: reservationData?.totalHour +" Hr" },
  ];
  const personalData = [
    { id: 1, topText: "First name", bottomText: reservationData?.firstName },
    { id: 2, topText: "Last name", bottomText: reservationData?.lastName },
    { id: 3, topText: "Email", bottomText: reservationData?.email },
    { id: 4, topText: "Phone", bottomText: reservationData?.phone },
    // { id: 5, topText: "Address line 1", bottomText: "" },
    // { id: 6, topText: "Address line 2", bottomText: "" },
    // { id: 7, topText: "City", bottomText: "London" },
    // { id: 8, topText: "State/Province/Region", bottomText: "" },
    // { id: 9, topText: "ZIP code/Postal code", bottomText: "95833" },
    { id: 10, topText: "Country", bottomText: "USA" },
    { id: 11, topText: "Special Requirements", bottomText: reservationData?.clientRequest },
  ];


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
              Booking details has been sent to: ${reservationData?.email}
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
                src="/assets/imgs/page/homepage1/e-class.png"
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
        </div>
      </div>
    </section>
  );
}
