import BreadCumb from "@/components/offlineForm/BreadCumb";
import OfflineForm from "@/components/offlineForm/OfflineForm";
import Map from "@/components/offlineForm/Map";
import Offices from "@/components/offlineForm/Offices";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import MobailHeader1 from "@/components/headers/MobailHeader1";
export const metadata = {
  title:
    "Offline Form || Lixride Chauffeur Limousine Transport and Car Hire Nextjs Template",
  description:
    "Lixride Chauffeur Limousine Transport and Car Hire Nextjs Template",
};
export default function page() {
  return (
    <>
      <Header1 />
      <MobailHeader1 />
      <main className="main">
        <BreadCumb />
        <Offices />
        <OfflineForm />
      </main>
      <Footer1 />
    </>
  );
}
