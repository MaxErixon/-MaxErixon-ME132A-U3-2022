"use strict";
// 2. Listening for when a user presses a key on their keyboard

// Lets say we have this HTML:
//  <input type="text" id="searchbox">

// "Key up" is the term for when you release your finger from one of the keys on your keyboard
// function onKeyUp() {
//     // This prints the current value of the input
//     console.log(DATABASE.students[2].firstName);
// }

// let input = document.getElementById("search");
// // We need to listen to the event "keyup"
// input.addEventListener("keyup", findStudent);


// //Global varibles
// // let search = document.getElementById("searchField");

// //Function to find student in Database based on lastName 

// function findStudent(){

//     let filterStudents = [];
//     let thisStudent = DATABASE.students.filter((thisStudent) => thisStudent.lastName.toLowerCase().includes(this.value));
//     filterStudents.push(thisStudent);
    
//     if (filterStudents == 0){
//         return console.log("No students found");
//     }else {
//         return console.log(filterStudents);
//     }
   
// }

// function onKeyUp() {
//     // This prints the current value of the input
//     console.log(this.value);
// }
// let hej = DATABASE.students.filter(firstname => firstname = "Jonna");

//  function filter() {
//      for ( let student of students){
//          console.log(students.student.ID);
//      }
//  }

    // function renderStudent(student) {
    //     for (let i = 0; i < students.student.length; i++){
    //         let div = document.createElement("div");
    //         div.classList.add("container")
    //     }
    // }



// let input = document.getElementById("searchbox");
// // We need to listen to the event "keyup"
// input.addEventListener("keyup",DATABASE.filter(student => DATABASE.student[3].firstname) );






// function renderStudent(student) {
//     let div = document.createElement("div");
//     div.classList.add("results");
//     div.id = student.id;
  
//     div.innerHTML = `
//         <h3>${DATABASE.students[2].lastName}</h3>
//         <div>Courses:</div>
//         <div>${DATABASE.courses[2].title}</div>
       
//     `;
  
//     return div;
//   }


//   function renderStudents(DATABASE) {
//     let studentsElement = document.querySelector(".results");
//     studentsElement.innerHTML = "";
  
//     for (let student of DATABASE) {
//       let studentElement = renderStudent(student);
//       studentsElement.appendChild(studentElement);
//     }
  
//   }
  






  let form = document.getElementById("searchStudents")

  
function findStudent() {
    let student = DATABASE.students.filter((student) => student.lastName.toLowerCase().includes(form.value.toLowerCase()));
    return student;
    
    
}




form.addEventListener('keyup', function () {
    let foundStudent = findStudent();
    document.querySelector(".results").innerHTML = "";
    createHTML(foundStudent);
  
    if (form.value == ""){
        document.querySelector(".results").innerHTML = "";
    }
  });
    


function renderStudent (student) {
    let studentCourse = getStudentCourses(student)
    let studentTotalCred = studentCourse.reduce(function (a, b) {
      return a + b
    }, 0)
  
    let wrapper = document.querySelector(".results")
    let div = document.createElement('div')
    div.classList.add('resultstudent')
    wrapper.appendChild(div)
    let p = document.createElement('p')
    p.classList.add('results1')
    p.innerText =
      student.firstName +
      ' ' +
      student.lastName +
      ' - Total credits: ' +
      studentTotalCred
    div.appendChild(p)
  
    let p2 = document.createElement('p'); 
    div.appendChild(p2);
    p2.innerText = 'Courses: '
  
    let foundCourses = getCourseById(student)
  
    for (let i = 0; i < foundCourses.length; i++) {
      let courseDiv = document.createElement('div')
      div.appendChild(courseDiv)
      courseDiv.innerText =
        foundCourses[i].title +
        ' (started: ' +
        student.courses[i].started.semester +
        ' ' +
        student.courses[i].started.year +
        '), ' +
        student.courses[i].passedCredits +
        ' of ' +
        foundCourses[i].totalCredits +
        ' credits.'
      if (foundCourses[i].totalCredits == student.courses[i].passedCredits) {
        courseDiv.classList.add('passedcourse')
      }
    }
  }

  function getStudentCourses (student) {
    let studentCourses = []
  
    for (let studentCourse of student.courses) {
      for (let dbCourse of DATABASE.courses) {
        if (studentCourse.courseId == dbCourse.courseId) {
          studentCourses.push(studentCourse.passedCredits)
        }
      }
    }
  
    return studentCourses
  }

function createHTML (students) {
   
    for (let student of students) {
        renderStudent(student);
    }   

}



function getCourseById (student) {
    let foundCourses = []
  
    for (let i = 0; i < student.courses.length; i++) {
      foundCourses.push(
        DATABASE.courses.find(course => {
          return course.courseId == student.courses[i].courseId
        })
      )
    }
    return foundCourses
  }


