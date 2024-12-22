"use client";
export default function Features() {
  return (
    <section className="section">
      <div className="container-sub">
        <div className="mt-60">
          <h2 className="heading-44-medium mb-30 color-text title-fleet wow fadeInUp">
            Luxury Chauffeur-Driven Airport Transfers and Pickups in New York City and the Tri-State Area
          </h2>
          <div className="content-single wow fadeInUp">
            <p>
              Experience unparalleled comfort and professionalism with our premium limo services. We provide exceptional, safe, and reliable airport transfers across all <strong>New York City boroughs (Manhattan, Brooklyn, Queens, Bronx, Staten Island)</strong> and the <strong>Tri-State Area</strong>.
            </p>
            <p>
              Whether traveling to or from <strong>JFK, LaGuardia, Newark Liberty, Teterboro</strong>, or any private aviation facility, we guarantee a stress-free journey.
            </p>
            <ul className="list-ticks list-ticks-small">
              <li className="text-16 mb-20">Meet and Greet Service with Professional Chauffeurs</li>
              <li className="text-16 mb-20">One Hour Complimentary Wait Time</li>
              <li className="text-16 mb-20">Real-Time Flight Tracking for Timely Pickups</li>
              <li className="text-16 mb-20">Luxury Fleet with High-End, Well-Maintained Vehicles</li>
              <li className="text-16 mb-20">Fixed Prices with No Hidden Fees</li>
              <li className="text-16 mb-20">VIP Service for a Personalized, First-Class Experience</li>
              <li className="text-16 mb-20">
                One Child Rides Free with a <strong>Complimentary Child Seat</strong>
              </li>
            </ul>
            <p className="final-note">
              Book your <strong>luxury chauffeur-driven transfer</strong> today and experience first-class service across New York City and beyond!
            </p>
          </div>
        </div>
      </div>
      <style jsx>{`
        .section {
          padding: 40px 20px;
          background-color: #f9f9f9;
        }

        .container-sub {
          max-width: 1200px;
          margin: 0 auto;
        }

        .mt-60 {
          margin-top: 60px;
        }

        .heading-44-medium {
          font-size: 38px;
          text-align: center;
          margin-bottom: 20px;
          color: #333;
        }

        .content-single {
          font-size: 16px;
          line-height: 1.6;
          color: #555;
          margin-top: 20px;
        }

        .list-ticks-small {
          padding-left: 20px;
          margin-top: 20px;
        }

        .list-ticks-small li {
          margin-bottom: 10px;
          list-style-type: disc;
        }

        .final-note {
          font-weight: bold;
          margin-top: 30px;
          text-align: center;
        }

        /* Responsive Design */
        @media (max-width: 992px) {
          .heading-44-medium {
            font-size: 32px;
          }

          .content-single {
            font-size: 15px;
          }

          .section {
            padding: 30px 15px;
          }
        }

        @media (max-width: 768px) {
          .heading-44-medium {
            font-size: 28px;
          }

          .content-single {
            font-size: 14px;
          }

          .list-ticks-small {
            padding-left: 15px;
          }
        }

        @media (max-width: 480px) {
          .heading-44-medium {
            font-size: 24px;
            line-height: 1.2;
          }

          .content-single {
            font-size: 12px;
          }

          .section {
            padding: 20px 10px;
          }
        }
      `}</style>
    </section>
  );
}
