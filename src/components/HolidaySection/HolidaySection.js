import React, { useState, useEffect } from "react";

import calenderIcon from "../../assets/icons/Group 856.svg";
import filterIcon from "../../assets/icons/filter-line.svg";
import plusIcon from "../../assets/icons/plus-line.svg";
import editIcon from "../../assets/icons/edit.svg";
import deleteIcon from "../../assets/icons/delete.svg";

import "./HolidaySection.scss";
import Modal from "../Modal/Modal";

const HolidaySection = () => {
  const initialState = {
    name: "",
    type: "Optional",
    date: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [currentId, setCurrentId] = useState(null);

  const holidayTabs = ["General", "Holiday", "Leave"];

  const [holidayTabsSelect, setHolidayTabSelect] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const [holidayList, setHolidayList] = useState([]);

  useEffect(() => {
    const list = currentId ? holidayList.find((l) => l.id === currentId) : null;
    if (currentId) {
      setIsOpen(true);
      setFormData({ name: list?.name, type: list?.type, date: list?.date });
    }
  }, [currentId]);

  const deleteHandler = (list) => {
    const filteredList = holidayList.filter((hl) => hl.id !== list.id);

    setHolidayList(filteredList);
  };

  console.log(holidayList);

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
      <div className="holiday__right-section">
        <div className="holiday__header">
          <h2>
            <span>Holiday</span>
          </h2>

          <div className="holiday__date">
            <div>
              <img src={calenderIcon} alt="calender"></img>
              <span>Year</span>
            </div>
            <div className="holiday__select">
              <select name="year" id="year">
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
              </select>
            </div>
          </div>
        </div>

        <p className="holiday__paragraph">
          Assign the holidays that you want to give to your employees for the
          year.
        </p>

        <div className="holiday__list">
          <span>List(6)</span>

          <div className="holiday__list-right">
            <div className="holiday__new-item" onClick={() => setIsOpen(true)}>
              <img src={plusIcon} alt="plusIcon"></img>
              <span>Add New</span>
            </div>
            <div className="holiday__filter">
              <img src={filterIcon} alt="filterIcon"></img>
              <span>Filter</span>
            </div>

            <div className="holiday__select">
              <select name="Item" id="Item">
                <option value="All">All</option>
              </select>
            </div>
          </div>
        </div>

        <div className="list">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Date</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                {holidayList.length
                  ? holidayList.map((list) => (
                      <>
                        <td data-label="Name">{list.name}</td>
                        <td data-label="Type">{list.type}</td>
                        <td data-label="Date">{list.date}</td>
                        {list.name && (
                          <>
                            <td
                              data-label="Edit"
                              onClick={() => setCurrentId(list.id)}
                            >
                              <img src={editIcon} alt="edit"></img>
                            </td>
                            <td
                              data-label="Delete"
                              onClick={() => deleteHandler(list)}
                            >
                              <img src={deleteIcon} alt="delete"></img>
                            </td>
                          </>
                        )}
                      </>
                    ))
                  : ""}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        setHolidayList={setHolidayList}
        setIsOpen={setIsOpen}
        holidayList={holidayList}
        formData={formData}
        setFormData={setFormData}
        currentId={currentId}
        initialState={initialState}
      />
    </section>
  );
};

export default HolidaySection;
