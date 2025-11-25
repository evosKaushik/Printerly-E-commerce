import Footer from "@/section/Footer";
import AboutUs from "@/section/Home/AboutUs";
import CompaniesMarquee from "@/section/Home/CompaniesMarquee";
import Hero from "@/section/Home/Hero";
import JustArrivePrinter from "@/section/Home/JustArrivePrinter";


const Home = () => {
  return (
    <main>
      <Hero />
      <JustArrivePrinter />
      <AboutUs />
      <CompaniesMarquee />
      <Footer/>
    </main>
  );
};

export default Home;
