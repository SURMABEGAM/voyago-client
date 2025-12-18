import React from "react";
import HeroSlider from "../home/HeroSlider";
import CostomerService from "../home/CostomerService";
import AboutsUs from "./AboutsUs";
import MobileApp from "../home/MobileApps";
import SearchBar from "../home/SeachBer";

const Home = () => {
  return (
    <div>
      <HeroSlider />
      <SearchBar />
      <MobileApp />
      <CostomerService></CostomerService>
      <AboutsUs />
    </div>
  );
};

export default Home;
