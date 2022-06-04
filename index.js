var card_info = document.querySelector("#all-student");
console.log(card_info);
var tableOfStudent = document.querySelector("#all-student");
const studentList = [
  {
    id: 1,
    Name: "Luis Rosada",
    Class: "y-196",
    Year_start: "2018",
    Year_graduation: "2023",
    Country: "Angola",
    Email: "luis@gmail.com",
  },
  {
    id: 2,
    Name: "Filipe Barr",
    Class: "y-196",
    Year_start: "2018",
    Year_graduation: "2023",
    Country: "Angola",
    Email: "luis@gmail.com",
  },
];

studentList.map((item) => {
  const card_infoClone = card_info.cloneNode(true);
  card_infoClone.querySelector(".card-info > td#name-of-student").innerText =
    item.Name;
  card_infoClone.querySelector(".card-info > td.class-student").innerText =
    item.Class;
  card_infoClone.querySelector(".card-info > td.year-student").innerText =
    item.Year_start;
  card_infoClone.querySelector(".card-info > td.year-start-student").innerText =
    item.Year_graduation;
  card_infoClone.querySelector(".card-info > td.country").innerText =
    item.Country;
  card_infoClone.querySelector(".card-info > td.email-student").innerText =
    item.Email;
  tableOfStudent.after(card_infoClone);
});

//var deleteStudent = document.querySelector
var deleteStudent = document.querySelectorAll(".delete");

deleteStudent.forEach((studentSelected, index) => {
  studentSelected.addEventListener("click", () => {
    console.log(index);
    studentList.filter((studentDelet) => {
      console.log("delet", studentDelet.id === index);
    });
  });
});

var editStudent = document.querySelectorAll(".edit");

editStudent.forEach((studentSelected, index) => {
  studentSelected.addEventListener("click", () => {
    console.log(index);
  });
});
