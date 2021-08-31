import React from "react";

import calenderIcon from "../../assets/icons/Group 856.svg";

import "./ModalForm.scss";

const ModalForm = ({ formData, setFormData }) => {
  return (
    <div className="modal__left-section">
      <h3>
        <span>Add new holiday</span>
      </h3>

      <div className="modal__form">
        <div className="modal__form-control">
          <label className="modal__label">Name</label>
          <input
            type="text"
            className="modal__input"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Type in your name..."
          ></input>
        </div>
        <div className="modal__form-control">
          <label className="modal__label">Date</label>
          <input
            type="date"
            className="modal__input"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          ></input>
          <img src={calenderIcon} alt="calender"></img>
        </div>
        <div className="modal__form-control">
          <label className="modal__label">Type</label>

          <div className="modal__select">
            <select
              name="holidayType"
              id="holidayType"
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
            >
              <option value="Optional">Optional</option>
              <option value="Beach Holidays">Beach Holidays</option>
              <option value="Adventures">Adventures</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalForm;
