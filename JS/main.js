/*
    TreeHouse Techdegree Full Stack JavaScript
    Project 2: Pagination & Content Filter

                        ***** AIMING FOR EXCEEDS EXPECTATIONS *****

WHAT THE CODE DOES:

    This JavaScript code is intended to handle pagination dynamically given an HTML list (in this 
    case a list of student profiles) of any size. The objective is that for any list exceeding 10 student profiles a pagination system kicks in to only show 10 profiles per page and provide the user with pagination buttons and a search field feature.

HOW IT DOES IT:

    The code will transform the list into an array, hide all the profiles (list items), slice the 
    array into a smaller array (of maximum 10 items) that will contain only the profiles 
    corresponding to the given page number and display only these profiles.

    So for instance, page 1 will contain items in index positions 0 - 9 from the unsliced array,
    page 2 will contain items 10 - 19, so on and so forth. 
*/


let studentListContainer = document.querySelector('div.page');
let studentListNodeList = document.querySelectorAll('.student-list li'); // returns a NodeList!!
let studentListArray = Array.from(studentListNodeList);
let paginationLinks = document.querySelectorAll('.pagination li');

/* showPage --> clears the page, builds a list of 10 students and displays it on the page.
depend on the page number passed to this function. */
const showPage = (pageNumber, studentList) => {

    for (let i = 0; i < studentList.length; i++) {
        studentList[i].style.display = 'none';
    }
    /* determineStudentListSection will slice the array into a smaller 10 student sub-array
     depending on the selected page number. */
    const determineStudentListSection = (pageNumber, studentList) => {
        let secondSliceNumber = pageNumber + (9 * pageNumber);
        let firstSliceNumber = secondSliceNumber - 10;
        let studentListSection = studentList.slice(firstSliceNumber, secondSliceNumber);
        return studentListSection;
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
    if (numberOfPages > 1) {
        // Create a page link section
        let newPaginationDiv = document.createElement('div');
        newPaginationDiv.className = 'pagination';
        studentListContainer.appendChild(newPaginationDiv);

        let paginationNav = document.querySelector('div.pagination');
        for (let i = 0; i < numberOfPages; i++) {
            let li = document.createElement('li');
            paginationNav.appendChild(li);
            let paginationLi = document.querySelector('.pagination li');
            let a = document.createElement('a');
            paginationLi.appendChild(a);
            a.textContent = i + 1;
        }
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

paginationLinks.addEventListener('click', () => {
    let clickedlink = querySelector('.pagination li a');
    let pageNumber = clickedLink.textContent;
    showPage(pageNumber, studentListArray);
});





/* searchList --> takes a value from the input field, and compares it to each student in the list
If that value is found inside the name or email of a student, that student is added to a new 
"matched" list. If the "matched" list is empty, then display a message that no matching students 
were found. Otherwise, call the appendPageLinks function to display the first page of matched 
results. */
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