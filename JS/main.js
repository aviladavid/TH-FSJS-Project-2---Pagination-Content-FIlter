let studentListContainer = document.querySelector('div.page');
let studentListNodeList = document.querySelectorAll('.student-list li'); // returns a NodeList!!
let studentListArray = Array.from(studentListNodeList);


/* determineStudentListSection will slice the array into 10 student sections depending on the selected page number. i.e. for page 2 items(students) for index positions 10 to 19 will be returned. */
const determineStudentListSection = (pageNumber, studentList) => {
    let secondSliceNumber = pageNumber + (9 * pageNumber);
    let firstSliceNumber = secondSliceNumber - 10;
    let studentListSection = studentList.slice(firstSliceNumber, secondSliceNumber);
    return studentListSection;
}
/*
secondSliceNumber
pg.1 => 1 + (1*9) = 10
pg.2 => 2 + (2*9) = 20
pg.3 => 3 + (3*9) = 30
pg.n => n + (n*9) = x
firstSliceNumber
pg.1 => secondSliceNumber - 10 = 0
pg.2 => secondSliceNumber - 10 = 10
pg.3 => secondSliceNumber - 10 = 20
pg.n => secondSliceNumber - 10 = y
*/

/* showPage --> clears the page, builds a list of 10 students and displays it on the page.
depend on the page number passed to this function. */
const showPage = (pageNumber, studentList) => {
    for (let i = 0; i < studentList.length; i++) {
        studentList[i].style.display = 'none';
    }
    let listSection = determineStudentListSection(pageNumber, studentList);
    for (let i = 0; i < listSection.length; i++) {
        listSection[i].style.display = 'list-item';
    }
    // if student should be on this page number (i.e. p.1)
    // appendPageLinks(studedntList);
    // Then loop through all students in our student list argument
    // Show student
} // showPage
showPage(6, studentListArray);

/* appendPageLinks --> creates all the page links based on a list of students. It will determine
how many pages we need based on the list's length, create a list of links for each page and, and 
append that list to the page */
const appendPageLinks = (studentList) => {
    // Determine how many pages for the given student list
    let numberOfPages = Math.ceil(studentList.length / 10);
    // Create a page link section
    let newPaginationDiv = document.createElement('div');
    newPaginationDiv.className = 'pagination';
    studentListContainer.appendChild(newPaginationDiv);

    let paginationNav = document.querySelector('div.pagination');
    for (let i = 0; i < numberOfPages; i ++) {
        let li = document.createElement('li');
        paginationNav.appendChild(li);
        let paginationLi = document.querySelector('.pagination li');
        let a = document.createElement('a');
        paginationLi.appendChild(a);
        a.textContent = i + 1;
    }
    // "for" every page
    // Add a page link to the page link section
    // Remove the old page link section from the site
    // Append our new page link section to the site
    // Define what happens when you click a link 
    // Use the showPage function to display the page for the link clicked
    // mark that link as active
}
appendPageLinks(studentListArray);

/* searchList --> takes a value from the input field, and compares it to each student in the list
If that value is found inside the name or email of a student, that student is added to a new 
"matched" list. If the "matched" list is empty, then display a message that no matching students 
were found. Otherwise, call the appendPageLinks function to display the first page of matched results. */
const searchList = () => {
    // Obtain the value of the search input
    // Remove the previous page link section
    // Loop over the student list, and for each student...
    // ...obtain the student's name...
    // ...and the student's email...
    // ...if the search value is found inside either email or name...
    // ...add this student to list of "matched" student
    // If there is no "matched" students...
    // Display a "no students found" message
    // If over 10 students were found...
    // ...call appendPageLinks with the matched students
    // Call showPage to show the first 10 students of matched list
}