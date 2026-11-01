import BannerSection from "@/components/Home/BannerSection";
import NextEventsHome from "@/components/Home/NextEventsHome";
import OurFeaturesPage from "@/components/Home/OurFeatures";
import PastEventsHome from "@/components/Home/PastEventsHome";
import Subscribe from "@/components/Home/Subscribe";

export default function Home() {
  return (
    <div>
      <BannerSection />
      <OurFeaturesPage />
      <NextEventsHome />
      <PastEventsHome />
      <Subscribe />
    </div>
  );
}
