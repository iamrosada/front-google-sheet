import { useContext, useEffect, useRef } from "react";
import { UserContext } from "../../context/context.api";
import { ModalCreate } from "../createstudent/createstudent";
import "./header.styles.css";

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

export const Header = () => {
  const ref = useRef();
  const [search, setSearch] = useContext(UserContext);
  const [, , openModalCreate, setOpenModalCreate] = useContext(UserContext);

  const handleOpen = () => {
    console.log("passei -----?", openModalCreate);
    setOpenModalCreate(true);
  };
  const handleChange = (e) => {
    e.preventDefault();
    const theValueIsType = e.target.value;

    setSearch(theValueIsType);
  };
  useOnClickOutside(ref, () => setOpenModalCreate(false));
  return (
    <header id="header">
      <span>Finalist students ВГУИТ</span>
      <div id="containerInput">
        <input
          placeholder="search all students"
          type="text"
          onChange={(e) => handleChange(e)}
        />
      </div>
      <button type="button" onClick={handleOpen}>
        create students
      </button>
      {openModalCreate && <ModalCreate isOpenModalCreate={ref} />}
    </header>
  );
};
