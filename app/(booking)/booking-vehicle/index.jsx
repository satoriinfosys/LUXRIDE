'use client';
import BookingTab from "@/components/booking/BookingTab";
import BookingVehicles from "@/components/booking/BookingVehicles";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import MobailHeader1 from "@/components/headers/MobailHeader1";
import { RecoilRoot } from "recoil";


export default function BookVehicle() {
  return (
    <RecoilRoot>
      <Header1 /> <MobailHeader1 />
      <main className="main">
        <section className="section">
          <div className="container-sub">
            <BookingTab />
            <BookingVehicles />
          </div>
        </section>
      </main>
      <Footer1 />
    </RecoilRoot>
  );
}
