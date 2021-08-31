import React, { useState, useMemo, useEffect } from "react";

import { v4 as uuidv4 } from "uuid";

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

const Modal = ({
  isOpen,
  setHolidayList,
  setIsOpen,
  formData,
  setFormData,
  holidayList,
  currentId,
  initialState,
}) => {
  const [files, setFiles] = useState();

  const [loading, setLoading] = useState(false);

  const {
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
      setLoading(true);

      setFiles(
        acceptedFiles.map((file) => (
          <li key={file.path}>
            {file.path} - {file.size} bytes
          </li>
        ))
      );

      acceptedFiles.forEach(async (file) => {
        const text = await file.text();
        const result = parse(text, { header: true });

        setHolidayList([
          ...holidayList,
          ...result?.data.slice(0, -1).map((n) => ({ ...n, id: uuidv4() })),
        ]);
        setLoading(false);
      });
    }
  }, [acceptedFiles]);

  const closeModalHandler = () => {
    setIsOpen(false);
    setLoading(true);

    if (formData.name && formData.type && formData.date) {
      let newList = {
        id: currentId,
        name: formData.name,
        type: formData.type,
        date: formData.date,
      };

      const foundList = holidayList.find((l) => l.id === newList.id);

      if (!foundList) {
        let l = {
          id: uuidv4(),

          name: formData.name,
          type: formData.type,
          date: formData.date,
        };

        setHolidayList([...holidayList, foundList]);
      } else {
        setHolidayList([
          ...holidayList,
          holidayList.map((l) =>
            l.id === newList.id
              ? ((l.name = newList.name),
                (l.type = newList.type),
                (l.date = newList.date))
              : l
          ),
        ].slice(0, -1));

      }

      setLoading(false);
      setFiles("");
    }
    setFormData(initialState);
  };

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
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Type in your name..."
              ></input>
            </div>
            <div className="modal__form-control">
              <label className="modal__label">Date</label>
              <input
                type="date"
                className="modal__input"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
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
        <div className="modal__right-section">
          <img
            src={closeIcon}
            alt="closeIcon"
            onClick={closeModalHandler}
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
                setLoading(true);

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

                  setHolidayList([
                    // ...holidayList,
                    ...result?.data
                      .map((n) => ({ ...n, id: uuidv4() })),
                  ]);

                  setLoading(false);
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

        <button className="modal__button" onClick={closeModalHandler}>
          Save
        </button>
      </div>
    </>
  );
};

export default Modal;
