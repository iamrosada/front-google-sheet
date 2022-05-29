import "./modal.css";

export const ModalEdit = ({ isOpen, refForClose }) => {
  console.log("refForClose", refForClose);
  return (
    <div
      id="myModal"
      className="modal"
      style={isOpen ? { display: "block" } : { display: "none" }}
    >
      <div className="modal-content" ref={refForClose}>
        <FormToEdit />
      </div>
    </div>
  );
};

const FormToEdit = () => {
  return (
    <section className="container-form">
      <span id="student-data">Student Personal data Vsuet</span>
      <div className="wrappe-form">
        <div className="name-class-container">
          <div className="input-form">
            <label htmlFor="">Name</label>
            <input type="text" />
          </div>

          <div className="input-form">
            <label htmlFor="">Class</label>
            <input type="text" />
          </div>
        </div>

        <div className="year-start-and-container">
          <div className="input-form">
            <label htmlFor="">Year start</label>
            <input type="text" />
          </div>

          <div className="input-form">
            <label htmlFor="">Year graduation</label>
            <input type="text" />
          </div>
        </div>

        <div className="year-start-and-container">
          <div className="input-form">
            <label htmlFor="">Country</label>
            <input type="text" />
          </div>

          <div className="input-form">
            <label htmlFor="">Email</label>
            <input type="text" />
          </div>
        </div>
      </div>
      <div className="container-button-save">
        <button className="save-edit">Save changes</button>
      </div>
    </section>
  );
};
