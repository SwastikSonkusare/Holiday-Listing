import React from "react";

import HolidaySection from "./components/HolidaySection/HolidaySection";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";

const App = () => {
  return (
    <main>
      <Sidebar />
      <div className="container">
        <Navbar />
        <HolidaySection />
      </div>
    </main>
  );
};

export default App;
