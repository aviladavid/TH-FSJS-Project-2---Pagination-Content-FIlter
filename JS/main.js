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

/* VARIABLES */
const studentListContainer = document.querySelector('div.page');
const studentListNodeList = document.querySelectorAll('.student-list li'); // returns a NodeList!!
const studentListArray = Array.from(studentListNodeList);
let numberOfPages = Math.ceil(studentListArray.length / 10);

/* FUNCTIONS */

/* showPage --> hides all elements on the page, builds a list of 10 students and displays it on the page depend on the page number passed to this function. */
const showPage = (pageNumber, studentList) => {
    console.log('showPage running');
    for (let i = 0; i < studentList.length; i++) {
        studentList[i].style.display = 'none';
        console.log('original list items have been hidden');
    }

    /* determineStudentListSection will slice the array into a smaller 10 item sub-array
     with its contents dependent on the selected page number. */
    const determineStudentListSection = (pageNumber, studentList) => {
        let secondSliceNumber = pageNumber + (9 * pageNumber);
        let firstSliceNumber = secondSliceNumber - 10;
        let studentListSection = studentList.slice(firstSliceNumber, secondSliceNumber);
        console.log('array has been sliced for page ' + pageNumber);
        return studentListSection;
    }
    console.log('Function Call --> determineStudentListSection');
    let listSection = determineStudentListSection(pageNumber, studentList);
    for (let i = 0; i < listSection.length; i++) {
        listSection[i].style.display = 'list-item';
    }
    console.log('new sub-array has been made visible');
    console.log('Function call --> appendPageLinks');
    appendPageLinks(studentList);
    
}


/* appendPageLinks --> creates all the page links based on a list of students. It will determine
how many pages we need based on the list's length, create a list of links for each page and, and 
append that list to the page */
const appendPageLinks = (pageNumber, studentList) => {
    console.log('appendPageLinks running');
    //crate <div class='pagination'>
    let newPaginationDiv = document.createElement('div');
    newPaginationDiv.className = 'pagination';
    // create pagination <ul class='pagination-ul'>
    let newPaginationUL = document.createElement('ul');
    newPaginationUL.className = 'pagination-ul';
    // append both elements
    studentListContainer.appendChild(newPaginationDiv);
    newPaginationDiv.appendChild(newPaginationUL);
    // select ul and append li and and a elements    
    let paginationUL = document.querySelector('.pagination-ul');
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
    // let clickedPageLink =  
    console.log('elements created and appended')

    // Remove the old page link section from the site
    // Append our new page link section to the site
    // Define what happens when you click a link 
    // Use the showPage function to display the page for the link clicked
    // mark that link as active
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
    console.log('kickstartPagination running');
    if (pagesNeeded > 1) {
        console.log('Function Call --> showPage');
        showPage(1, studentListArray); // This won't run for < 11 items and therefore it shouldn't interfere when showing other page numbers containing 10 or fewer items. 
        
    } else {
        return;
    }
}
console.log('Function Call --> kickstartPagination');
kickstartPagination(numberOfPages);



/* EVENT HANDLERS */

const paginationLinkItems = document.getElementsByTagName('a');
console.log(paginationLinkItems);

/* THIRD TRY */
for (let i = 0; i < paginationLinkItems.length; i ++) {
    paginationLinkItems[i].addEventListener('click', (event) => {
    // store the value for then new page number    
    let newPageNumber = event.target.textContent;
    //remove old link section
    let oldPaginationDiv = document.getElementsByClassName('pagination')[0];
    oldPaginationDiv.remove();
    // recreate link section
    appendPageLinks(newPageNumber, studentListArray);
    //clear and reassign class names
    let activeLink = paginationLinkItems[i];
    activeLink.className = 'active';
    // for (let i = 0; i < paginationLinkItems.length; i ++) {
    //     paginationLinkItems[i].className = '';
    // }
    //     event.target.className = 'active';
    //     console.log(event.target);
    // call showPage for the new page number
    showPage(newPageNumber, studentListArray);
    });
}

/* SECOND TRY */
// for (let i = 0; i < paginationLinkItems.length; i ++) {
//     paginationLinkItems[i].addEventListener('click', (event) => {
//     //remove old link section
//     let oldPaginationDiv = document.querySelector('.page:last-child');
//     studentListContainer.removeChild(oldPaginationDiv);
//     //clear and reassign class names
//     for (let i = 0; i < paginationLinkItems.length; i ++) {
//         paginationLinkItems[i].className = '';
//     }
//         event.target.className = 'active';
//         console.log(event.target);
//     // call showPage for the new page number
//     let page = event.target.textContent;
//     showPage(page, studentListArray);
//     });
// }

/* FIRST TRY */
// paginationLinkItems.addEventListener('click', (event) => {
//     paginationListItems.textContent = paginationListItems.textContent.toUppercase();
//     for (let i = 0; i < paginationListItems.length; i ++){
//         paginationListItems[i].className = '';
//     }
//     event.target.className = 'selected';
//     let page = event.target.textContent;
//     showPage(page, studentListArray);
// });