import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";

const App = () => {
  return (
    <main>
      <Sidebar />
      <div className="container">
        <Navbar />
      </div>
    </main>
  );
};

export default App;
