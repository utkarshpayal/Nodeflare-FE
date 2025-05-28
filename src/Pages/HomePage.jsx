import Choose from "../components/Choose";
import Docker from "../components/Docker";
import GetStart from "../components/GetStart";
import HomeSection from "../components/HomeSection";
import HowItWorks from "../components/HowItWorks";
import Payment from "../components/Payment";

const HomePage = () => {
  return (
    <div>
      <HomeSection />
      <Choose />
      <Payment />
      <Docker />
      <GetStart />
      <HowItWorks />
    </div>
  );
};

export default HomePage;
