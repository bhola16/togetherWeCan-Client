import BannerSection from "@/components/Home/BannerSection";
import OurFeaturesPage from "@/components/Home/OurFeatures";
import PastEvents from "@/components/Home/PastEvents";
import Subscribe from "@/components/Home/Subscribe";
import UpCommingInititives from "@/components/Home/UpCommingInititives";

export default function Home() {
  return (
    <div>
      <BannerSection />
      <OurFeaturesPage />
      <UpCommingInititives />
      <PastEvents />
      <Subscribe />
    </div>
  );
}
