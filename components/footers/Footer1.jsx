'use client';

import {
  instagramPosts,
  legalLinks,
  links1,
  links3,
  socialMediaPlatforms,
} from "@/data/footerLinks";
import Image from "next/image";
import Link from "next/link";

export default function Footer1() {
  return (
    <footer className="footer">
      <div className="footer-1" style={{ background: "#111", padding: "40px 0" }}>
        <div className="container-sub">
          <div className="box-footer-top">
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-6 text-md-start text-center mb-15 wow fadeInUp">
                <div className="d-flex align-items-center justify-content-md-start justify-content-center">
                  <a className="mr-30" href="#">
                    <Image
                      width={150}
                      height={19}
                      style={{ height: "fit-content" }}
                      src="/assets/imgs/template/logo.svg"
                      alt="Super Car Deluxe Logo"
                    />
                  </a>
                  <a
                    className="text-14-medium call-phone color-white hover-up"
                    href="tel:+13472297784"
                    style={{ textDecoration: 'none', marginLeft: '15px', color: '#fff' }}
                  >
                    +1 347 229 7784
                  </a>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 text-md-end text-center mb-15 wow fadeInUp">
                <div className="d-flex align-items-center justify-content-md-end justify-content-center">
                  <span className="text-18-medium color-white mr-10">Follow Us</span>
                  {socialMediaPlatforms.map((elm, i) => (
                    <a key={i} className={elm.className} href={elm.href} style={{ marginLeft: '15px', fontSize: '20px', color: '#fff' }}></a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="row mb-40">
            <div className="col-lg-3 width-20">
              <h5 className="text-18-medium color-white mb-20 wow fadeInUp">Company</h5>
              <ul className="menu-footer wow fadeInUp" style={{ paddingLeft: "0" }}>
                {links1.map((elm, i) => (
                  <li key={i} style={{ marginBottom: "10px" }}>
                    <Link href={elm.href} style={{ color: '#fff', textDecoration: 'none' }}>{elm.text}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-lg-3 width-20 mb-30">
              <h5 className="text-18-medium color-white mb-20 wow fadeInUp">Explore</h5>
              <ul className="menu-footer wow fadeInUp" style={{ paddingLeft: "0" }}>
                {links3.map((elm, i) => (
                  <li key={i} style={{ marginBottom: "10px" }}>
                    <a href={elm.href} style={{ color: '#fff', textDecoration: 'none' }}>{elm.name}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-lg-3 width-20 mb-30">
              <h5 className="text-18-medium color-white mb-20 wow fadeInUp">See Our Latest Instagram Posts</h5>
              <div className="instagram-gallery">
                {instagramPosts.map((post, index) => (
                  <div
                    key={post.id}
                    className="instagram-post"
                    style={{ gridColumn: (index % 2 === 0 ? 'span 1' : ''), gridRow: (index < 2 ? 'span 1' : '') }}
                  >
                    <Image
                      src={post.src}
                      alt={post.alt}
                      width={100}
                      height={100}
                      className="insta-img"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-2" style={{ background: "#0e0e0e", padding: "20px 0" }}>
        <div className="container-sub">
          <div className="footer-bottom">
            <div className="row align-items-center">
              <div className="col-lg-8 col-md-12 text-center text-lg-start">
                <span className="text-14 color-white mr-50">
                  © {new Date().getFullYear()} Super Car Deluxe
                </span>
                <ul className="menu-bottom">
                  {legalLinks.map((elm, i) => (
                    <li key={i} style={{ display: "inline", marginRight: "15px" }}>
                      <Link href={elm.href} style={{ color: '#fff', textDecoration: 'none' }}>{elm.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-lg-4 col-md-12 text-center text-lg-end">
                <a className="btn btn-link-location" href="#" style={btnStyle}>
                  New York
                </a>
                <a className="btn btn-link-globe active" href="#" style={btnStyle}>
                  English
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inline Style for Hover Effect */}
      <style jsx>{`
        .hover-up:hover {
          transform: translateY(-5px);
          transition: transform 0.3s ease;
        }

        .btn {
          background: transparent;
          border: 1px solid #fff;
          padding: 8px 20px;
          margin-top: 5px;
          color: #fff;
          text-transform: uppercase;
          text-decoration: none;
        }

        .btn:hover {
          background-color: #fff;
          color: #111;
        }

        /* Mobile View Adjustments */
        @media (max-width: 768px) {
          .container-sub {
            padding: 0 15px;
          }

          .row {
            flex-direction: column;
          }

          .col-lg-3, .col-md-6 {
            width: 100%;
            margin-bottom: 20px;
          }

          .text-18-medium {
            font-size: 16px;
          }

          .footer-bottom .row {
            flex-direction: column;
          }

          .footer-bottom .col-lg-8 {
            text-align: center;
            margin-bottom: 15px;
          }

          .footer-bottom .col-lg-4 {
            text-align: center;
          }
        }

        /* Instagram Grid Layout */
        .instagram-gallery {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }

        .instagram-post {
          width: 100%;
          height: 100%;
        }

        .insta-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      `}</style>
    </footer>
  );
}

// Inline style for buttons
const btnStyle = {
  color: "#fff",
  textDecoration: "none",
  fontWeight: "bold",
  margin: "0 10px",
  padding: "8px 16px",
  border: "1px solid #fff",
  textTransform: "uppercase",
};
