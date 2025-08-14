import React from "react";

//Dummy icons 
const InnovationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.293 2.293a1 1 0 010 1.414L10 17l-4 4-4-4 9.293-9.293a1 1 0 011.414 0z" />
    </svg>
);

const QualityIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const SupportIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
 function About() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

        {/* Header Section */}
        <header className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight">
            About Us
          </h1>
          <p className="mt-4 max-w-2xl m-auto text-lg sm:text-xl text-gray-600">
           TripNest is your trusted companion for finding the perfect place to stay
            from cozy cottages and beachfront villas to city apartments and countryside retreats.  We bring together travelers and hosts to create unforgettable journeys, one stay at a time.
          </p>
        </header>

        {/* Our Mission & Story Section */}
        <div className="py-15 text-center">
          <div className="bg-white p-8 justify rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
             At TripNest, our mission is to make travel more personal, seamless, and inspiring. We believe that every journey should feel like coming home whether it’s a cozy cabin in the mountains or a chic apartment in the city.Our goal is to connect travelers with unique stays and trusted hosts, creating experiences that go beyond a place to sleep. Through innovation, transparency, and community-driven values, we strive to make booking your next trip as effortless as packing your favorite bag.
            </p>
          </div>
          </div>
          {/* <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-gray-700 leading-relaxed">
              Founded in a small garage in 2020, our company was born from a shared dream to build something
              meaningful. What started as a side project quickly grew into a full-fledged business, fueled by late
              nights, endless coffee, and an unwavering belief in our vision. Today, we are proud to serve thousands
              of users worldwide.
            </p>
          </div> */}
        {/* </div> */}

        {/* Why Choose Us Section */}
        <section className="mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-white p-8 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300">
              <InnovationIcon />
              <h3 className="text-2xl font-semibold text-gray-800 mt-4 mb-2">Unique Stays</h3>
              <p className="text-gray-600">
                Discover one-of-a-kind accommodations that you won’t find on typical booking sites from treehouses to luxury lofts, each with its own story.
              </p>
            </div>
            <div className="text-center bg-white p-8 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300">
              <QualityIcon />
              <h3 className="text-2xl font-semibold text-gray-800 mt-4 mb-2">Unmatched Quality</h3>
              <p className="text-gray-600">
                We are committed to the highest standards of quality in everything we do, from product to support.
              </p>
            </div>
            <div className="text-center bg-white p-8 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300">
              <SupportIcon />
              <h3 className="text-2xl font-semibold text-gray-800 mt-4 mb-2">Dedicated Support</h3>
              <p className="text-gray-600">
                Our customers are our top priority. We're here to help you every step of the way.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}


export default About