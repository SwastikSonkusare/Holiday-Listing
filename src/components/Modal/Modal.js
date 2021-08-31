import React, { useState, useMemo, useEffect } from "react";

import { v4 as uuidv4 } from "uuid";

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
import ModalForm from "../ModalForm/ModalForm";

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
      let updatedList = {
        id: currentId,
        name: formData.name,
        type: formData.type,
        date: formData.date,
      };

      const foundList = holidayList.find((l) => l.id === updatedList.id);

      if (!foundList) {
        let newList = {
          id: uuidv4(),

          name: formData.name,
          type: formData.type,
          date: formData.date,
        };

        setHolidayList([...holidayList, newList]);
      } else {
        setHolidayList(
          [
            ...holidayList,
            holidayList.map((l) =>
              l.id === updatedList.id
                ? ((l.name = updatedList.name),
                  (l.type = updatedList.type),
                  (l.date = updatedList.date))
                : l
            ),
          ].slice(0, -1)
        );
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
        <ModalForm formData={formData} setFormData={setFormData} />

        <div className="modal__right-section">
          <img
            src={closeIcon}
            alt="closeIcon"
            onClick={closeModalHandler}
            className="modal__close"
          ></img>
          <div className="modal__container">
            <p className="modal__paragraph">
              Download Sample in <span className="modal__csv">.csv format</span>{" "}
              file to ensure that you have the correct file ready to import
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

                  setHolidayList(
                    [
                      ...holidayList,
                      ...result?.data.map((n) => ({ ...n, id: uuidv4() })),
                    ].slice(0, -1)
                  );

                  setLoading(false);
                });
              }}
            >
              <input {...getInputProps()} />
              <img src={fileIcon} alt="fileIcon"></img>
              <p className="modal__paragraph">
                Drag and drop CSV file <br /> or{" "}
                <span className="modal__click-here">Click here</span> to upload
              </p>
            </div>
            {files?.length ? (
              <>
                <h4 className="modal__files">Files</h4>
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
