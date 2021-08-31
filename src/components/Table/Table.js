import React from "react";

import editIcon from "../../assets/icons/edit.svg";
import deleteIcon from "../../assets/icons/delete.svg";


import './Table.scss'

const Table = ({ holidayList, deleteHandler, setCurrentId }) => {
  return (
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
  );
};

export default Table;
