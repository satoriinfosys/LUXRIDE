import { partners } from "@/data/partners";
import Image from "next/image";

export default function Partners() {
  return (
    <section className="section pt-65 pb-35 border-bottom">
      <div className="container-sub">
        <div className="row align-items-center">
          <div className="col-xl-3 col-lg-4 mb-30">
            <h3 className="color-primary wow fadeInUp">
              Our Fleet 
              <br className="d-none d-lg-block" />
              Brands 
            </h3>
          </div>
          <div className="col-xl-9 col-lg-8 mb-30">
            <div className="logo-container">
              <ul className="list-logos d-flex align-items-center wow fadeInUp">
                {/* List of logos */}
                {partners.map((elm, i) => (
                  <li key={i} className="logo-item">
                    <Image
                      width={180}
                      height={70}
                      style={{
                        width: "180px",
                        height: "70px",
                        objectFit: "contain",
                      }}
                      src={elm.url}
                      alt="Super Car Deluxe"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Add CSS for the scrolling effect */}
      <style jsx>{`
        .logo-container {
          position: relative;
          overflow: hidden; /* Hide overflowing logos */
        }

        .list-logos {
          display: flex;
          align-items: center;
          animation: scrollLeft 20s linear infinite;
        }

        .logo-item {
          margin-right: 30px; /* Adjust space between logos */
        }

        /* Keyframe animation for scrolling the logos */
        @keyframes scrollLeft {
          0% {
            transform: translateX(0); /* Start at the initial position */
          }
          100% {
            transform: translateX(-100%); /* Move logos off the screen */
          }
        }

        /* Ensure the container is wide enough to hold all logos */
        .list-logos {
          display: flex;
          white-space: nowrap;
          width: max-content;
        }

        /* Make sure logos wrap seamlessly */
        .logo-container:before {
          content: "";
          width: 100%;
          height: 0;
        }
      `}</style>
    </section>
  );
}
