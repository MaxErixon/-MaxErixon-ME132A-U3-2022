let form = document.getElementById("searchCourses");

form.addEventListener("keyup", function () {
  let foundCourse = findCourse();
  document.querySelector(".results").innerHTML = "";
  createHTML(foundCourse);

  if (form.value == "") {
    document.querySelector(".results").innerHTML = "";
  }
});

function findCourse() {
  let course = DATABASE.courses.filter((course) =>
    course.title.toLowerCase().includes(form.value.toLowerCase())
  );
  course.sort(function (a, b) {
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    }
    return 0;
  });

  return course;
}

function renderCourse(course) {
  let wrapper = document.querySelector(".results");
  let div = document.createElement("div");
  div.classList.add("resultcourse");
  wrapper.appendChild(div);
  let p = document.createElement("p");
  p.classList.add("results1");
  p.innerText =
    course.title + " " + " - course credits: " + course.totalCredits;
  div.appendChild(p);

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
      ")";

    teachersWrapper.appendChild(teacherDiv);
  }
  let studentWrapper = document.createElement("div");
  studentWrapper.classList.add("studentWrapper");
  wrapper.appendChild(studentWrapper);

  let studentTitle = document.createElement("h3");
  studentTitle.innerText = "Students:";
  studentWrapper.appendChild(studentTitle);

  studentTitle.style.gridColumn = "1/5";

  let foundStudents = getStudentById(course);

  let foundStudentCourse = [];

  for (let student of foundStudents) {
    for (let courseArray of student.courses) {
      if (courseArray.courseId == course.courseId) {
        foundStudentCourse.push(courseArray);
      }
    }
  }

  for (let i = 0; i < foundStudents.length; i++) {
    let studentDiv = document.createElement("div");

    studentWrapper.appendChild(studentDiv);

    studentDiv.classList.add("students", "courseStudents");

    studentDiv.innerText =
      foundStudents[i].firstName +
      " " +
      foundStudents[i].lastName +
      " (" +
      foundStudentCourse[i].passedCredits +
      " credits " +
      ") " +
      "\n" +
      foundStudentCourse[i].started.semester +
      " " +
      foundStudentCourse[i].started.year;

    if (course.totalCredits == foundStudentCourse[i].passedCredits) {
      studentDiv.style.backgroundColor = "green";
      studentDiv.style.color = "white";
      studentDiv.style.padding = "5px";
    }
  }
}

function createHTML(courses) {
  for (let course of courses) {
    renderCourse(course);
  }
}

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

function getStudentById(course) {
  let foundStudent = [];

  for (let student of DATABASE.students) {
    for (studentCourse of student.courses) {
      if (studentCourse.courseId == course.courseId) {
        foundStudent.push(student);
      }
    }
  }

  return foundStudent;
}
