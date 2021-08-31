import React, { useState }  from "react";

import arrow from "./assets/icons/rightarrow.svg";

import HolidaySection from "./components/HolidaySection/HolidaySection";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";

const App = () => {
  const [showSidebar, setShowSidebar] = useState(false)


const toggleSideBarHandler = () => {
  setShowSidebar(prev => !prev)
}

  return (
    <main className="main">
      <Sidebar showSidebar={showSidebar} />
      <div className="container">
        <Navbar />
        <HolidaySection />
      </div>

      <img src={arrow} alt="rightArrow" className="main__img" onClick={toggleSideBarHandler}></img>
    </main>
  );
};

export default App;
