import React, { useState } from "react";

import "./HolidaySection.scss";

const HolidaySection = () => {
  const holidayTabs = ["General", "Holiday", "Leave"];

  const [holidayTabsSelect, setHolidayTabSelect] = useState("");

  return (
    <section className="holiday">
      <div className="holiday__left-section">
        {holidayTabs.map((holiday) => (
          <button
            className={
              holidayTabsSelect === holiday
                ? "holiday__button active"
                : "holiday__button"
            }
            onClick={() => setHolidayTabSelect(holiday)}
          >
            {holiday}
          </button>
        ))}
      </div>
      <div className="holiday__right-section"></div>
    </section>
  );
};

export default HolidaySection;
