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
// const response = await fetch("https://sheetdb.io/api/v1/tqgx5o7phzhvv", {
//   method: "GET",
//   headers: { "Content-Type": "application/json; charset=utf-8" },
//   // body: JSON.stringify(personalData)
// });

export const Card = () => {
  const [allstudent, setAllStudent] = useState([]);
  // const response = await fetch(
  //   "https://api.sheety.co/5d0329c7e797512f74ba599faf046c14/finalistStudent/sheet1",
  //   {
  //     method: "GET",
  //     // headers: { "Content-Type": "application/json; charset=utf-8" },
  //   }
  // )
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log("eee", data);
  //     setAllStudent(data);
  //   });
  // console.log("fff", allstudent.sheet1);

  const [filteredStudenty, setFilteredStudenty] = useState([]);

  const [search, setSearch] = useContext(UserContext);
  const [getId, setGetId] = useState(Number);
  const [EditStudent, setEditStudent] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();

  const handleRemoveItem = useCallback((id) => {
    fetch(
      `https://api.sheety.co/5d0329c7e797512f74ba599faf046c14/finalistStudent/sheet1/${id}`,
      {
        method: "DELETE",
        // headers: { "Content-Type": "application/json; charset=utf-8" },
        // body: JSON.stringify(deleteStudent),
      }
    )
      .then((response) => {
        response.json();
      })
      .then(() => {
        console.log("object deleted");
      });
  }, []);
  console.log(EditStudent, "EditStudent----");
  const handleModalEdit = useCallback(
    (id) => {
      const editDataStudent = allstudent.filter((item) => item.id === id);
      setEditStudent(editDataStudent);
      console.log("viagemmmm", editDataStudent);

      setIsOpen(true);
    },
    [EditStudent, allstudent]
  );

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://api.sheety.co/5d0329c7e797512f74ba599faf046c14/finalistStudent/sheet1",
        {
          method: "GET",
          //   // headers: { "Content-Type": "application/json; charset=utf-8" },
        }
      );
      let result = await response.json();
      console.log("vida", result.sheet1);
      setAllStudent(result.sheet1);
    };

    fetchData();
  }, []);
  console.log("id", getId);
  useEffect(() => {
    setFilteredStudenty(
      allstudent.filter(
        (student) =>
          student.class.toLowerCase().includes(search.toLowerCase()) ||
          student.country.toLowerCase().includes(search.toLowerCase()) ||
          student.name.toLowerCase().includes(search.toLowerCase()) ||
          student.email.toLowerCase().includes(search.toLowerCase()) ||
          student.yearGraduated.toLowerCase().includes(search.toLowerCase()) ||
          student.yearStart.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, allstudent]);
  console.log("god", filteredStudenty);
  useOnClickOutside(ref, () => setIsOpen(false));
  return (
    <>
      {filteredStudenty.map((item) => {
        return (
          <table id="all-student" key={item.id}>
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
                  console.log("id cliclado", item.id);
                  handleModalEdit(item.id);
                  setGetId(item.id);
                }}
              >
                Edit
              </th>
            </tr>

            <tr className="card-info">
              <td>{item.name}</td>
              <td>{item.class}</td>
              <td>{item.yearStart}</td>
              <td>{item.yearGraduated}</td>
              <td>{item.country}</td>
              <td>{item.email}</td>

              <td className="delete" onClick={() => handleRemoveItem(item.id)}>
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
          isId={getId}
        />
      ) : null}
    </>
  );
};
