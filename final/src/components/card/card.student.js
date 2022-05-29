import { useState, useEffect, useRef } from "react";
import { ModalEdit } from "../modal/modal.edit";
import "./card.styles.css";
const studentList = [
  {
    Name: "Luis Rosada",
    Class: "y-196",
    Year_start: "2018",
    Year_graduation: "2023",
    Country: "Angola",
    Email: "Mario2gmail",
  },
  {
    Name: "Filipe Barr",
    Class: "y-196",
    Year_start: "2018",
    Year_graduation: "2023",
    Country: "Angola",
    Email: "luis@gmail.com",
  },
  {
    Name: "Filipe Barr",
    Class: "y-196",
    Year_start: "2018",
    Year_graduation: "2023",
    Country: "Angola",
    Email: "gildo@gmail.com",
  },
];
function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

export const Card = () => {
  const [deleteStudent, setDeleteStuedent] = useState(studentList);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();

  const handleRemoveItem = (email) => {
    console.log(email);
    const deleter = deleteStudent.filter((item) => item.Email !== email);
    setDeleteStuedent(deleter);
  };

  const handleModalEdit = () => {
    setIsOpen(true);
    console.log("clo");
  };

  useOnClickOutside(ref, () => setIsOpen(false));
  return (
    <>
      {deleteStudent.map((item) => {
        return (
          <table id="all-student" key={item.Email}>
            <tr>
              <th> Name</th>
              <th>Class</th>
              <th>Year start</th>
              <th> Year graduation </th>
              <th> Country</th>
              <th> Email</th>
              <th className="edit" onClick={() => handleModalEdit()}>
                Edit
              </th>
            </tr>

            <tr className="card-info">
              <td>{item.Name}</td>
              <td>{item.Class}</td>
              <td>{item.Year_start}</td>
              <td>{item.Year_graduation}</td>
              <td>{item.Country}</td>
              <td>{item.Email}</td>
              <td
                className="delete"
                onClick={() => handleRemoveItem(item.Email)}
              >
                Delete
              </td>
            </tr>
          </table>
        );
      })}
      {isOpen ? <ModalEdit isOpen={isOpen} refForClose={ref} /> : null}
    </>
  );
};
