import React from "react";

import settingsIcon from "../../assets/icons/Settings.svg";
import chatIcon from "../../assets/icons/Layer 2.svg";
import questionIcon from "../../assets/icons/Layer 2 (1).svg";
import settingsIcon1 from "../../assets/icons/Layer 2 (2).svg";
import userIcon from "../../assets/icons/Group 815.svg";

import "./Navbar.scss";

const Navbar = () => {
  const liItems = [chatIcon, questionIcon, settingsIcon1];

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <img src={settingsIcon} alt="setting" ></img>
        <span>Setting</span>
      </div>

      <ul className="navbar__items">
        {liItems.map((item) => (
          <li className="navbar__item">
            <a href="#" className="navbar__links">
              <img src={item} alt="item" className="navbar__icons"></img>
            </a>
          </li>
        ))}

        <div className="navbar__select">
          <select name="money" id="money">
            <option value="50,000">50,000</option>
          </select>
        </div>

        <li className="navbar__item">
          <a href="#" className="navbar__links">
            <img src={userIcon} alt="user" className="navbar__user"></img>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
