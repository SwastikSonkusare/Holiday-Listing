import React, { useState } from "react";

import icon1 from "../../assets/icons/Group 646.svg";
import icon2 from "../../assets/icons/Group 618.svg";
import icon3 from "../../assets/icons/Group 620.svg";
import icon4 from "../../assets/icons/Group 622.svg";
import icon5 from "../../assets/icons/Path 1974.svg";

import "./Sidebar.scss";

const Sidebar = ({ sidebarRef }) => {
  const icons = [icon2, icon3, icon4, icon5];
  const [tabSelect, setTabSelect] = useState("");

  return (
    <aside className="sidebar" ref={sidebarRef}>
      <img src={icon1} alt="rightArrowIcon" className="sidebar__arrow"></img>

      <div className="sidebar__icons">
        {icons.map((icon, i) => (
          <div
            className={
              tabSelect === i ? "sidebar__icons active" : "sidebar__icons"
            }
            onClick={() => setTabSelect(i)}
            key={i}
          >
            <img src={icon} alt="icon"></img>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
