/*
    TreeHouse Techdegree Full Stack JavaScript
    Project 2: Pagination & Content Filter

                        ***** AIMING FOR EXCEEDS EXPECTATIONS *****

WHAT IT DOES:

    This JavaScript code is intended to handle pagination dynamically given an HTML list (in this 
    case a list of student profiles) of any size. The objective is that for any list exceeding 10 
    student profiles a pagination system kicks in to only show 10 profiles per page and provide 
    the user with pagination buttons and a search field feature.

HOW IT WORKS:

    The code will transform the list into an array, hide all the profiles (list items), slice the 
    array into a smaller array (of maximum 10 items) that will contain only the profiles 
    corresponding to the given page number and display them.

    So for instance, page 1 will contain items in index positions 0 - 9 from the unsliced array,
    page 2 will contain items 10 - 19, so on and so forth. 
*/


const studentListContainer = document.querySelector('div.page');
const studentListNodeList = document.querySelectorAll('.student-list li'); // returns a NodeList!!
const studentListArray = Array.from(studentListNodeList);
let numberOfPages = Math.ceil(studentListArray.length / 10);


/* determineStudentListSection will slice the array into a smaller 10 item sub-array
     with its contents dependent on the selected page number. */
const determineStudentListSection = (pageNumber, studentList) => {
    let secondSliceNumber = pageNumber + (9 * pageNumber);
    let firstSliceNumber = secondSliceNumber - 10;
    let studentListSection = studentList.slice(firstSliceNumber, secondSliceNumber);
    return studentListSection;
}

// hides the list items 
const hideList = (studentList) => {
    for (let i = 0; i < studentList.length; i++) {
        studentList[i].style.display = 'none';
    }
}
/* showPage --> builds a list of 10 students and displays it on the page depend on the page number passed to this function. Assigns the active class to the clicked item */
const showPage = (pageNumber, studentList) => {
    let listSection = determineStudentListSection(pageNumber, studentList);
    for (let i = 0; i < listSection.length; i++) {
        listSection[i].style.display = 'list-item';
    }
    appendPageLinks(pageNumber, studentList);
    let activeLink = document.getElementsByTagName('a');
    activeLink[pageNumber - 1].className = 'active';
}

const removeOldLinks = () => {
    let paginationUL = document.querySelector('.pagination-ul');
    while (paginationUL.firstChild) {
        paginationUL.removeChild(paginationUL.firstChild);
    }
}

/* appendPageLinks --> creates all the page links based on a list of students. It will determine
how many pages we need based on the list's length, create a list of links for each page and, and 
append that list to the page */
const appendPageLinks = (pageNumber, studentList) => {
    let paginationUL = document.querySelector('.pagination-ul');
    removeOldLinks();
    // create and append li and a elements    
    for (let i = 0; i < numberOfPages; i++) {

        //adding li elements
        let li = document.createElement('li');
        li.className = 'pagination-li';
        paginationUL.appendChild(li);

        //adding a to the li's
        let paginationLiNode = document.querySelectorAll('.pagination li');
        let paginationLiArray = Array.from(paginationLiNode);
        let a = document.createElement('a');
        paginationLiArray[i].appendChild(a);
        a.textContent = i + 1;
    }
}

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

/* kickstartPagination gets the process started. If only 1 page is needed (i.e. array items < 11) 
then no pagination is applied */
const kickstartPagination = (pagesNeeded) => {
    if (pagesNeeded > 1) {
        //crate <div class='pagination'>
        hideList(studentListArray);

        let newPaginationDiv = document.createElement('div');
        newPaginationDiv.className = 'pagination';

        // create pagination <ul class='pagination-ul'>
        let newPaginationUL = document.createElement('ul');
        newPaginationUL.className = 'pagination-ul';

        // append both elements
        studentListContainer.appendChild(newPaginationDiv);
        newPaginationDiv.appendChild(newPaginationUL);

        // build page 1
        showPage(1, studentListArray);
    } else {
        return;
    }
}
kickstartPagination(numberOfPages);

/* EVENT HANDLER */

const paginationLinkItems = document.getElementsByTagName('a');
console.log('paginationLinkItems');
console.log(paginationLinkItems);

for (let i = 0; i < paginationLinkItems.length; i++) {
    paginationLinkItems[i].addEventListener('click', (event) => {
        // store the value for then new page number    
        let newPageNumber = parseInt(event.target.textContent, 10);
        // rebuild page 
        hideList(studentListArray);
        showPage(newPageNumber, studentListArray);
    });
}