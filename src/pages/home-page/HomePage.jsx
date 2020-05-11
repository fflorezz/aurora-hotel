import React from "react";
import { Link } from "react-router-dom";

import Hero from "./../components/Hero";
import Banner from "./../components/Banner";
import Services from "./../components/Services";
import FeaturedRooms from "../components/FeaturedRooms";
import ScrollToTop from "./../components/ScrollToTop";

const HomePage = () => {
  return (
    <>
      <ScrollToTop />
      <Hero>
        <Banner
          title="Luxurious Rooms"
          subtitle="deluxe rooms starting at $299"
        >
          <Link to="/rooms" className="btn-primary">
            Our Rooms
          </Link>
        </Banner>
      </Hero>
      <Services />
      <FeaturedRooms />
    </>
  );
};

export default HomePage;