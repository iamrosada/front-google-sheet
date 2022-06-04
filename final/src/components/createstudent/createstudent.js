import { useState } from "react";
import "./create.student.css";

export const ModalCreate = ({ isOpenModalCreate }) => {
  return (
    <div
      id="myModal"
      className="modal"
      // style={isOpen ? { display: "block" } : { display: "none" }}
    >
      <div className="modal-content" ref={isOpenModalCreate}>
        <FormToEdit />
      </div>
    </div>
  );
};

const FormToEdit = () => {
  const [nameOfStudent, setNameOfStudent] = useState("");
  const [countryOfStudent, setCountryOfStudent] = useState("");
  const [classOfStudent, setClassOfStudent] = useState("");
  const [yearStartOfStudent, setYearStartOfStudent] = useState("");
  const [yearGraguatedOfStudent, setYearGraguatedOfStudent] = useState("");
  const [emailOfStudent, setEmailOfStudent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const personalData = {
      sheet1: {
        name: nameOfStudent,
        class: classOfStudent,
        yearStart: yearStartOfStudent,
        country: countryOfStudent,
        email: emailOfStudent,
        yearGraduated: yearGraguatedOfStudent,
      },
    };
    console.log(personalData);
    if (
      nameOfStudent.trim() &&
      countryOfStudent.trim() &&
      classOfStudent.trim() &&
      yearStartOfStudent.trim() &&
      yearGraguatedOfStudent.trim() &&
      emailOfStudent.trim()
    ) {
      fetch(
        "https://api.sheety.co/5d0329c7e797512f74ba599faf046c14/finalistStudent/sheet1",
        {
          method: "POST",
          headers: { "Content-Type": "application/json; charset=utf-8" },
          body: JSON.stringify(personalData),
        }
      ).then((response) => response.json());
      console.log("SUCCESS", {
        nameOfStudent: nameOfStudent,
        countryOfStudent: countryOfStudent,
        classOfStudent: classOfStudent,
        yearStartOfStudent: yearStartOfStudent,
        yearGraguatedOfStudent: yearGraguatedOfStudent,
        emailOfStudent: emailOfStudent,
      });
    }

    setNameOfStudent("");
    setCountryOfStudent("");
    setClassOfStudent("");
    setYearStartOfStudent("");
    setYearGraguatedOfStudent("");
    setEmailOfStudent("");
  };

  return (
    <section className="container-form">
      <span id="student-data">Create Student Personal data Vsuet</span>
      <div className="wrappe-form">
        <div className="name-class-container">
          <div className="input-form">
            <label htmlFor="">Name</label>
            <input
              type="text"
              value={nameOfStudent}
              onChange={(e) => setNameOfStudent(e.target.value)}
            />
          </div>

          <div className="input-form">
            <label htmlFor="">Class</label>
            <input
              type="text"
              value={classOfStudent}
              onChange={(e) => {
                setClassOfStudent(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="year-start-and-container">
          <div className="input-form">
            <label htmlFor="">Year start</label>
            <input
              type="text"
              value={yearStartOfStudent}
              onChange={(e) => {
                setYearStartOfStudent(e.target.value);
              }}
            />
          </div>

          <div className="input-form">
            <label htmlFor="">Year graduated</label>
            <input
              type="text"
              value={yearGraguatedOfStudent}
              onChange={(e) => {
                setYearGraguatedOfStudent(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="year-start-and-container">
          <div className="input-form">
            <label htmlFor="">Country</label>
            <input
              type="text"
              value={countryOfStudent}
              onChange={(e) => {
                setCountryOfStudent(e.target.value);
              }}
            />
          </div>

          <div className="input-form">
            <label htmlFor="">Email</label>
            <input
              type="text"
              value={emailOfStudent}
              onChange={(e) => {
                setEmailOfStudent(e.target.value);
              }}
            />
          </div>
        </div>
      </div>

      <div className="container-button-save">
        <button
          type="button"
          onClick={(e) => handleSubmit(e)}
          className="save-edit"
        >
          Save changes
        </button>
      </div>
    </section>
  );
};
