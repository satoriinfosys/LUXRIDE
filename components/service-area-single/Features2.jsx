import { BASE_URL } from "@/app/_api/apiService";
import { features7 } from "@/data/features";
import Image from "next/image";
import React from "react";

export default function Features2({ serviceArea }) {
  return (
    <section className="section">
      <div className="container-sub">
        <div className="mt-120">
          {/* <h2 className="heading-44-medium mb-30 color-text title-fleet wow fadeInUp">
            Airport transfer in the city
          </h2> */}
          <div className="content-single wow fadeInUp">
            <p>
              {serviceArea.description}
            </p>
            {/* <p>
              Et, morbi at sagittis vehicula rutrum. Lacus tortor, quam arcu mi
              et, at lectus leo nunc. Mattis cras auctor vel pharetra tempor.
              Rhoncus pellentesque habitant ac tempor. At aliquam euismod est in
              praesent ornare etiam id. Faucibus libero sit vehicula sed
              condimentum. Vitae in nam porttitor rutrum sed aliquam donec sed.
              Sapien facilisi lectus.
            </p> */}
            {/* <ul className="list-ticks list-ticks-small">
              {features7.map((elm, i) => (
                <li key={i} className="text-16 mb-20">
                  {elm}
                </li>
              ))}
            </ul> */}
          </div>
        </div>
        <div className="row align-items-center mt-90">
          <div className="col-lg-6 mb-30 wow fadeInUp">
            <Image
              width={1710}
              height={1800}
              style={{ height: "fit-content" }}
              src={BASE_URL + `/user/image/${serviceArea?.images?.[1]}`}
              alt="luxride"
            />
          </div>
          <div className="col-lg-6 mb-30">
            <div className="box-info-right wow fadeInUp">
              {/* <h3 className="heading-44-medium color-text mb-30">
                Get to or from the airport
              </h3> */}
              <p className="text-16 color-text" dangerouslySetInnerHTML={{ __html: serviceArea.footDescription }}>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
