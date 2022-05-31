import { useState } from "react";
import "./modal.css";

export const ModalEdit = ({ isOpen, refForClose, EditStudent }) => {
  console.log("refForClose", refForClose);
  return (
    <div
      id="myModal"
      className="modal"
      style={isOpen ? { display: "block" } : { display: "none" }}
    >
      <div className="modal-content" ref={refForClose}>
        <FormToEdit EditStudent={EditStudent} />
      </div>
    </div>
  );
};

const FormToEdit = ({ EditStudent }) => {
  const [input, setInput] = useState(EditStudent);

  const [nameOfStudent, setNameOfStudent] = useState(
    EditStudent.map((item) => item.name)
  );

  const [countryOfStudent, setCountryOfStudent] = useState(
    EditStudent.map((item) => item.country)
  );
  const [classOfStudent, setClassOfStudent] = useState(
    EditStudent.map((item) => item.class)
  );
  const [yearStartOfStudent, setYearStartOfStudent] = useState(
    EditStudent.map((item) => item.yearStart)
  );
  const [yearGraguatedOfStudent, setYearGraguatedOfStudent] = useState(
    EditStudent.map((item) => item.yearGraduated)
  );
  const [emailOfStudent, setEmailOfStudent] = useState(
    EditStudent.map((item) => item.email)
  );

  const handleName = (e) => {
    e.preventDefault();
    const theName = e.target.value;
    setNameOfStudent(theName);
  };

  const handleCountry = (e) => {
    e.preventDefault();
    const theCountry = e.target.value;
    setCountryOfStudent(theCountry);
  };

  const handleYearStart = (e) => {
    e.preventDefault();
    const theStart = e.target.value;
    setYearStartOfStudent(theStart);
  };

  const handleClass = (e) => {
    e.preventDefault();
    const theClass = e.target.value;
    setClassOfStudent(theClass);
  };

  const handleYearGraguated = (e) => {
    e.preventDefault();
    const theYearGraguated = e.target.value;
    setYearGraguatedOfStudent(theYearGraguated);
  };
  const handleEmail = (e) => {
    e.preventDefault();
    const theEmail = e.target.value;
    setEmailOfStudent(theEmail);
  };
  const handleSubmitEdit = () => {
    const data = {
      sheet1: {
        name: nameOfStudent,
        class: classOfStudent,
        country: countryOfStudent,
        yearGraduated: yearGraguatedOfStudent,
        yearStart: yearStartOfStudent,
        email: emailOfStudent,
      },
    };
    fetch(
      `https://api.sheety.co/5d0329c7e797512f74ba599faf046c14/finalistStudent/sheet1/${id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(data),
      }
    )
      .then((response) => {
        response.json();
      })
      .then((data) => console.log("is IDDD", data));
    console.log("update", data);
  };
  return (
    <section className="container-form">
      <span id="student-data">Student Personal data Vsuet</span>
      {input.map((item, idx) => {
        return (
          <div key={item.id} className="wrappe-form">
            <div className="name-class-container">
              <div className="input-form">
                <label htmlFor="">Name</label>
                <input
                  type="text"
                  placeholder={item.name}
                  onChange={(e) => handleName(e)}
                  value={nameOfStudent}
                />
              </div>

              <div className="input-form">
                <label htmlFor="">Class</label>
                <input
                  type="text"
                  placeholder={item.class}
                  onChange={(e) => handleClass(e)}
                  value={classOfStudent}
                />
              </div>
            </div>

            <div className="year-start-and-container">
              <div className="input-form">
                <label htmlFor="">Year start</label>
                <input
                  type="text"
                  placeholder={item.yearStart}
                  onChange={(e) => handleYearStart(e)}
                  value={yearStartOfStudent}
                />
              </div>

              <div className="input-form">
                <label htmlFor="">Year graduated</label>
                <input
                  type="text"
                  placeholder={item.yearGraduated}
                  onChange={(e) => handleYearGraguated(e)}
                  value={yearGraguatedOfStudent}
                />
              </div>
            </div>

            <div className="year-start-and-container">
              <div className="input-form">
                <label htmlFor="">Country</label>
                <input
                  type="text"
                  placeholder={item.country}
                  onChange={(e) => handleCountry(e)}
                  value={countryOfStudent}
                />
              </div>

              <div className="input-form">
                <label htmlFor="">Email</label>
                <input
                  type="text"
                  placeholder={item.email}
                  onChange={(e) => handleEmail(e)}
                  value={emailOfStudent}
                />
              </div>
            </div>
          </div>
        );
      })}
      <div className="container-button-save">
        <button
          type="button"
          onClick={() => {
            handleSubmitEdit();
          }}
          className="save-edit"
        >
          Save changes
        </button>
      </div>
    </section>
  );
};
