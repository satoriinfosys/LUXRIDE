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
            <ul className="list-logos  d-flex  align-item-center  wow fadeInUp">
              {partners.map((elm, i) => (
                <li key={i}>
                  <Image
                    width={130}
                    height={27}
                    style={{
                      width: "130px",
                      height: "27",
                      objectFit: "contain",
                    }}
                    src={elm.url}
                    alt="Super Car Deluxe "
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
