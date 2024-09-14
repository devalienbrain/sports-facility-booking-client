import Banner from "@/components/HomeComponents/Banner";
import BookingTipsRecommendations from "@/components/HomeComponents/BookingTipsRecommendations";
import CustomerTestimonials from "@/components/HomeComponents/CustomerTestimonials";
import FAQSection from "@/components/HomeComponents/FAQSection";
import FeaturedItems from "@/components/HomeComponents/FeaturedItems";
import Footer from "@/components/HomeComponents/Footer";
import HowItWorks from "@/components/HomeComponents/HowItWorks";
import ScrollToTopButton from "@/components/HomeComponents/ScrollToTop";

const SportsHome = () => {
  return (
    <>
      <div>
        <Banner />
      </div>
      <div className="min-h-screen max-w-7xl mx-auto p-10">
        <div className="py-16">
          <FeaturedItems />
        </div>
        <div className="py-16">
          <HowItWorks />
        </div>
        <div className="py-16">
          <CustomerTestimonials />
        </div>
        {/* <div className="py-16">
          <TopTrendingFacilities />
        </div> */}
        <div className="py-16">
          <BookingTipsRecommendations />
        </div>
        <div className="py-16">
          <FAQSection />
        </div>
      </div>
      <div className="bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto">
          <Footer />
        </div>
      </div>
      <ScrollToTopButton />
    </>
  );
};

export default SportsHome;
