import Link from "next/link";
import React from "react";

export default function Breadcumb({ serviceArea }) {

  return (
    <div className="section pt-60 pb-60 bg-primary">
      <div className="container-sub">
        <h1 className="heading-44-medium color-white mb-5">{serviceArea.name}</h1>
        <div className="box-breadcrumb">
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/service-area-list">Service Area</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
