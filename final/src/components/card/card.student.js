import {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  useContext,
} from "react";
import { HiOutlineTrash, HiOutlinePencil } from "react-icons/hi";
import { UserContext } from "../../context/context.api";
import { ModalEdit } from "../modal/modal.edit";
import "./card.styles.css";
const studentList = [
  {
    name: "Luis Rosada",
    class: "y-196",
    yearStart: "2018",
    yearGraduated: "2023",
    country: "Angola",
    email: "Mario2gmail",
  },
  {
    name: "Filipe Bar.",
    class: "y-196",
    yearStart: "2019",
    yearGraduated: "2024",
    country: "Angola",
    email: "luis@gmail.com",
  },
  {
    name: "Mitchelle Gito.",
    class: "y-196",
    yearStart: "2018",
    yearGraduated: "2023",
    country: "Kenya",
    email: "gildo@gmail.com",
  },

  {
    name: "Edson Kapen.",
    class: "x-106",
    yearStart: "2018",
    yearGraduated: "2023",
    country: "Angola",
    email: "kapen@gmail.com",
  },

  {
    name: "Maxime Julia.",
    class: "y-196",
    yearStart: "2018",
    yearGraduated: "2024",
    country: "Angola",
    email: "gildo@gmail.com",
  },

  {
    name: "Filipe Barr",
    class: "y-196",
    yearStart: "2018",
    yearGraduated: "2023",
    country: "Angola",
    email: "gildo@gmail.com",
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
      }
    )
      .then((response) => {
        response.json();
      })
      .then(() => {
        console.log("object deleted");
      });
  }, []);
  // console.log(EditStudent, "EditStudent----");

  const handleModalEdit = useCallback(
    (id) => {
      const editDataStudent = allstudent.filter((item) => item.id === id);
      setEditStudent(editDataStudent);
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
          headers: { "Content-Type": "application/json; charset=utf-8" },
        }
      );
      let result = await response.json();
      console.log("vida", result.sheet1);
      setAllStudent(result.sheet1);
    };

    fetchData();
  }, []);
  console.log("id", search);
  useEffect(() => {
    setFilteredStudenty(
      allstudent.filter(
        (student) =>
          student.class.toLowerCase().includes(search.toLowerCase()) ||
          student.yearStart.includes(search) ||
          student.country.toLowerCase().includes(search.toLowerCase()) ||
          student.name.toLowerCase().includes(search) ||
          student.email.includes(search.toLowerCase()) ||
          student.yearGraduated.includes(search)
        // student.yearStart.includes(search)
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
                  handleModalEdit(item.id);
                  setGetId(item.id);
                }}
              >
                <HiOutlinePencil />
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
                <HiOutlineTrash />
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
