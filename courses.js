let form = document.getElementById("searchCourses")

  
function findCourse() {
    let course = DATABASE.courses.filter((course) => course.title.toLowerCase().includes(form.value.toLowerCase()));
    return course;
    
    
}




form.addEventListener('keyup', function () {
    let foundCourse = findCourse();
    document.querySelector(".results").innerHTML = "";
    createHTML(foundCourse);
  
    if (form.value == ""){
        document.querySelector(".results").innerHTML = "";
    }
  });
    


function renderCourse (course) {
    // let studentCourse = getStudentCourses(student)
    // let studentTotalCred = studentCourse.reduce(function (a, b) {
    //   return a + b
    // }, 0)
  
    let wrapper = document.querySelector(".results")
    let div = document.createElement('div')
    div.classList.add('resultcourse')
    wrapper.appendChild(div)
    let p = document.createElement('p')
    p.classList.add('results1')
    p.innerText =
      course.title +
      ' ' +
      ' - course credits: ' +
      course.totalCredits
    div.appendChild(p)

    let foundResponsible = findResponsible(course);

  let responsibleWrapper = document.createElement("div");
  wrapper.appendChild(responsibleWrapper);

  let responsibleTitle = document.createElement("h3");
  responsibleTitle.innerText = "Course Responible:";
  responsibleWrapper.appendChild(responsibleTitle);

  for (let i = 0; i < foundResponsible.length; i++) {
    let responsibleDiv = document.createElement("div");
    responsibleDiv.classList.add("responsibleDiv");
    responsibleDiv.innerText =
      foundResponsible[i].firstName +
      " " +
      foundResponsible[i].lastName +
      " (" +
      foundResponsible[i].post +
      " )";

    responsibleWrapper.appendChild(responsibleDiv);
  }
  
    
  let foundTeachers = findTeachers(course);

  let teachersWrapper = document.createElement("div");
  wrapper.appendChild(teachersWrapper);

  let teacherTitle = document.createElement("h3");
  teacherTitle.style.gridColumn = "1/5";
  teacherTitle.innerText = "Teachers:";

  teachersWrapper.appendChild(teacherTitle);

  teachersWrapper.classList.add("teacherWrapper");

  for (let i = 0; i < foundTeachers.length; i++) {
    let teacherDiv = document.createElement("div");
    teacherDiv.classList.add("teacherDiv");
    teacherDiv.innerText =
      foundTeachers[i].firstName +
      " " +
      foundTeachers[i].lastName +
      " (" +
      foundTeachers[i].post +
      ") ";

    teachersWrapper.appendChild(teacherDiv);
  }
  }


function createHTML (courses) {
   
    for (let course of courses) {
        renderCourse(course);
    }   

}

// function courseResponsible (id) {
//     let allTeachers = DATABASE.teachers
//     let course = DATABASE.courses[id]
//     let teachersNames = allTeachers.map((teacher) => teacher.firstName + " " + teacher.lastName + " " + teacher.post)
//     let res = course.courseResponsible
//     return teachersNames[res]
// }



// function getStudentById (course) {
//     let foundStudents = []
  
//     for (let i = 0; i < student.courses.length; i++) {
//       foundCourses.push(
//         DATABASE.courses.find(course => {
//           return course.courseId == student.courses[i].courseId
//         })
//       )
//     }
//     return foundCourses
//   }



//   function findTeachers(courses){
//     let teacherBox = [];
//     for (let i = 0; i < DATABASE.teachers.length; i++) {
//         let div = document.createElement("div")
//         if (DATABASE.teachers[i] == courses.teachers[0]){
//             let text = div.innerHTML = DATABASE.teachers[i].firstName + DATABASE.teachers[i].lastName;
//             teacherBox.push(text)

//         }
//         else if(DATABASE.teachers[i] == courses.teachers[1]){
//             let text = div.innerHTML = DATABASE.teachers[i].firstName + DATABASE.teachers[i].lastName;
//             teacherBox.push(text)

//         }
//         else if (DATABASE.teachers[i] == courses.teachers[2]){
//             let text = div.innerHTML = DATABASE.teachers[i].firstName + DATABASE.teachers[i].lastName;
//             teacherBox.push(text)

//         }
        
//     }
//     return teacherBox.toString().split(",").join("");
//   }

function findResponsible(course) {
    let foundResponsible = [];
  
    for (let teacher of DATABASE.teachers) {
      if (teacher.teacherId == course.courseResponsible) {
        foundResponsible.push(teacher);
      }
    }
  
    return foundResponsible;
  }

  function findTeachers(course) {
    let foundTeacher = [];
  
    for (let teacher of DATABASE.teachers) {
      for (let courseTeacher of course.teachers) {
        if (courseTeacher == teacher.teacherId) {
          foundTeacher.push(teacher);
        }
      }
    }
  
    return foundTeacher;
  }