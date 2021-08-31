import React, { useRef } from "react";

import arrow from "./assets/icons/rightarrow.svg";

import HolidaySection from "./components/HolidaySection/HolidaySection";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";

const App = () => {
  const sidebarRef = useRef();

  const toggleSideBarHandler = () => {
    sidebarRef.current.classList.toggle("show-sidebar");
  };

  return (
    <main className="main">
      <Sidebar sidebarRef={sidebarRef} />
      <div className="container">
        <Navbar />
        <HolidaySection />
      </div>

      <img
        src={arrow}
        alt="rightArrow"
        className="main__img"
        onClick={toggleSideBarHandler}
      ></img>
    </main>
  );
};

export default App;
