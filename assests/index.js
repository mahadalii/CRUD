// // index.js

// // List of students ko store karne ke liye ek array define karein
// let students = [
//     { firstName: "Mahad", lastName: "Ali Shaikh", rollNumber: "260" }
//   ];

//   // Function to render the student list table
//   function renderStudentList() {
//     const studentList = document.getElementById("student-list");
//     studentList.innerHTML = "";

//     students.forEach((student, indexx) => {
//       const row = document.createElement("tr");
//       row.innerHTML = `
//         <td>${student.firstName}</td>
//         <td>${student.lastName}</td>
//         <td>${student.rollNumber}</td>
//         <td>
//           <button class="btn btn-warning btn-sm" onclick="editStudent(${indexx})">Edit</button>
//           <button class="btn btn-danger btn-sm" onclick="deleteStudent(${indexx})">Delete</button>
//         </td>
//       `;
//       studentList.appendChild(row);
//     });
//   }

//   // Function to add a new student
//   function addStudent(event) {
//     event.preventDefault();

//     const firstName = document.getElementById("firstName").value.trim();
//     const lastName = document.getElementById("lastName").value.trim();
//     const rollNumber = document.getElementById("rollNumber").value.trim();

//     if (firstName !== "" && lastName !== "" && rollNumber !== "") {
//       const newStudent = { firstName, lastName, rollNumber };
//       students.push(newStudent);

//       // Form inputs ko clear karein
//       document.getElementById("firstName").value = "";
//       document.getElementById("lastName").value = "";
//       document.getElementById("rollNumber").value = "";

//       renderStudentList();
//     }
//   }

//   // Function to edit a student
//   function editStudent(index) {

//   }

//   // Function to delete a student
//   function deleteStudent(index) {
//     students.splice(index, 1);
//     renderStudentList();
//   }

//   // Form submit pe event listener add karein
//   document.getElementById("student-form").addEventListener("submit", addStudent);

//   // Page load pe student list ka initial rendering
//   renderStudentList();


let students = [];
const fname = document.getElementById('firstName');
const lname = document.getElementById('lastName');
const rno = document.getElementById('rollNumber');
const studentForm = document.getElementById('student-form');
// const btnsubmit = document.getElementById('submit');

studentForm.addEventListener("submit", (e) => {
  e.preventDefault();
  registerData();
  retriveData();
  studentForm.reset('');
})

if (localStorage.getItem("students") != null) {
  students = JSON.parse(localStorage.getItem("students"))
}
const registerData = () => {
  students.push({
    firstname: fname.value,
    lastname: lname.value,
    rollnumber: rno.value
  });
  studentString = JSON.stringify(students);
  localStorage.setItem("students", studentString);
  swal("Good job!", "Student data has been successfully submited!", "success")
}

let tableData = document.getElementById('dataTable')
const retriveData = () => {
  tableData.innerHTML = '';
  // console.log('students',typeof students);
  students.forEach((student,index) => {
    tableData.innerHTML += `
    <tr index= '${index}'>
    <td>${index + 1}</td>
    <td>${student.firstname}</td>
    <td>${student.lastname}</td>
    <td>${student.rollnumber}</td>
    <td>
        <a  id = "editBtn" class="btn btn-warning btn-sm">Edit</a>
        <a  id = "deleteBtn" class="btn btn-danger btn-sm">Delete</a>
    </td>
    </tr>
    `;
  });
  //  Delete functionality

  const allDelBtn = document.querySelectorAll('#deleteBtn');
  for (let i = 0; i < allDelBtn.length; i++) {
    allDelBtn[i].onclick = function () {
      let td = this.parentElement.parentElement;
      let id = td.getAttribute("index");
      swal({
        title: "Are you sure?",
        text: "Onece deleted, you will not be able to recover this.",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
        .then((willDelete) => {
          if (willDelete) {
            // alert(id);
            students.splice(id, 1);
            localStorage.setItem("students", JSON.stringify(students));
            td.remove();
            swal("Deleted successfully", {
              icon: "success",
            });
          }
          else {
            swal("Your  file is safe, not deleted");
          }
        })
    }
  }

// Edit Functionality

  const allEditBtn = document.querySelectorAll('#editBtn')
  for(let i = 0; i<allEditBtn.length; i++){
    allEditBtn[i].onclick = function(){
      let tr = this.parentElement.parentElement;
      let td = tr.getElementsByTagName('td');
      let index = tr.getAttribute('index');
      console.log(index);
    }
  }
}
retriveData();