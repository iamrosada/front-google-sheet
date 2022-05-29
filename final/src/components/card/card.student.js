import {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  useContext,
} from "react";
import { UserContext } from "../../context/context.api";
import { ModalEdit } from "../modal/modal.edit";
import "./card.styles.css";
const studentList = [
  {
    Name: "Luis Rosada",
    Class: "y-196",
    Year_start: "2018",
    Year_graduated: "2023",
    Country: "Angola",
    Email: "Mario2gmail",
  },
  {
    Name: "Filipe Barr",
    Class: "y-196",
    Year_start: "2010",
    Year_graduated: "2023",
    Country: "Angola",
    Email: "luis@gmail.com",
  },
  {
    Name: "Filipe Barr",
    Class: "y-196",
    Year_start: "2018",
    Year_graduated: "2023",
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
      window.history.go(0);
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
  const [data, setData] = useState(studentList);

  const [allstudent, setAllStudent] = useState(studentList);
  const [filteredStudenty, setFilteredStudenty] = useState([]);

  const [search, setSearch] = useContext(UserContext);
  const [deleteStudent, setDeleteStudent] = useState(studentList);
  const [EditStudent, setEditStudent] = useState(studentList);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();

  const handleRemoveItem = (email) => {
    console.log(email);
    const deleter = deleteStudent.filter((item) => item.Email !== email);
    setDeleteStudent(deleter);
  };

  const handleModalEdit = useCallback((t) => {
    console.log("clo");

    setIsOpen(true);
  }, []);

  const handleEdit = useCallback(
    (email) => {
      console.log("email", email);
      const editDataStudent = EditStudent.filter(
        (item) => item.Email === email
      );
      setEditStudent(editDataStudent);
      console.log(editDataStudent, "editDataStudent");
    },
    [EditStudent]
  );

  useEffect(() => {
    setFilteredStudenty(
      allstudent.filter(
        (student) =>
          student.Class.toLowerCase().includes(search.toLowerCase()) ||
          student.Country.toLowerCase().includes(search.toLowerCase()) ||
          student.Name.toLowerCase().includes(search.toLowerCase()) ||
          student.Email.toLowerCase().includes(search.toLowerCase()) ||
          student.Year_graduated.toLowerCase().includes(search.toLowerCase()) ||
          student.Year_start.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, allstudent]);
  useOnClickOutside(ref, () => setIsOpen(false));
  return (
    <>
      {filteredStudenty.map((item) => {
        return (
          <table id="all-student" key={item.Email}>
            <tr>
              <th> Name</th>
              <th>Class</th>
              <th>Year start</th>
              <th> Year graduated </th>
              <th> Country</th>
              <th> Email</th>
              <th
                className="edit"
                onClick={() => {
                  handleModalEdit(item.Email);
                  handleEdit(item.Email);
                }}
              >
                Edit
              </th>
            </tr>

            <tr className="card-info">
              <td>{item.Name}</td>
              <td>{item.Class}</td>
              <td>{item.Year_start}</td>
              <td>{item.Year_graduated}</td>
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
      {isOpen ? (
        <ModalEdit
          isOpen={isOpen}
          refForClose={ref}
          EditStudent={EditStudent}
        />
      ) : null}
    </>
  );
};
