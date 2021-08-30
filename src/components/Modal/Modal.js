import React, { useState, useMemo, useEffect } from "react";

import calenderIcon from "../../assets/icons/Group 856.svg";
import closeIcon from "../../assets/icons/Layer 2 (3).svg";
import fileIcon from "../../assets/icons/Layer 2 (4).svg";

import { useDropzone } from "react-dropzone";
import { parse } from "papaparse";

import {
  baseStyle,
  activeStyle,
  acceptStyle,
  rejectStyle,
} from "./ModalStyles";

import "./Modal.scss";

const Modal = ({ isOpen, setHolidayList, setIsOpen }) => {
  const [holidayName, setHolidayName] = useState("");
  const [files, setFiles] = useState();

  const [holidayDate, setHolidayDate] = useState("");
  const [holidayType, setHolidayType] = useState("Optional");

  let {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone();

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  useEffect(() => {
    if (acceptedFiles.length !== null) {
      setFiles(
        acceptedFiles.map((file) => (
          <li key={file.path}>
            {file.path} - {file.size} bytes
          </li>
        ))
      );
    }
  }, [acceptedFiles]);

  if (!isOpen) return null;

  return (
    <>
      <div className="overlay"></div>
      <div className="modal">
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
                value={holidayName}
                onChange={(e) => setHolidayName(e.target.value)}
              ></input>
            </div>
            <div className="modal__form-control">
              <label className="modal__label">Date</label>
              <input
                type="date"
                className="modal__input"
                value={holidayDate}
                onChange={(e) => setHolidayDate(e.target.value)}
              ></input>
              <img src={calenderIcon} alt="calender"></img>
            </div>
            <div className="modal__form-control">
              <label className="modal__label">Type</label>

              <div className="modal__select">
                <select
                  name="holidayType"
                  id="holidayType"
                  onChange={(e) => setHolidayType(e.target.value)}
                >
                  <option value="Optional">Optional</option>
                  <option value="Beach Holidays">Beach Holidays</option>
                  <option value="Adventures">Adventures</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="modal__right-section">
          <img
            src={closeIcon}
            alt="closeIcon"
            onClick={() => setIsOpen(false)}
            className="modal__close"
          ></img>
          <div className="modal__container">
            <p className="modal__paragraph">
              Download Sample in <span>.csv format</span> file to ensure that
              you have the correct file ready to import
            </p>

            <div
              {...getRootProps({ style })}
              onDragOver={(e) => {
                e.preventDefault();
              }}
              onDrop={(e) => {
                e.preventDefault();

                setFiles(
                  Array.from(e.dataTransfer.files).map((file) => (
                    <>
                      <li key={file.name}>
                        {file.name} - {file.size} bytes
                      </li>
                    </>
                  ))
                );

                Array.from(e.dataTransfer.files).forEach(async (file) => {
                  const text = await file.text();
                  const result = parse(text, { header: true });
                  setHolidayList(result);
                });
              }}
            >
              <input {...getInputProps()} />
              <img src={fileIcon} alt="fileIcon"></img>
              <p className="modal__paragraph">
                Drag and drop CSV file <br /> or <span>Click here</span> to
                upload
              </p>
            </div>
            {files?.length ? (
              <>
                <h4>Files</h4>
                {files}
              </>
            ) : (
              ""
            )}
          </div>
        </div>

        <button className="modal__button">Save</button>
      </div>
    </>
  );
};

export default Modal;
