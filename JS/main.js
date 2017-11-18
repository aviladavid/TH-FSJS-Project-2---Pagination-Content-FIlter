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

document.addEventListener('DOMContentLoaded', () => {

    const pageHeader = document.querySelector('.page-header');
    const studentListContainer = document.querySelector('div.page');
    const studentListNodeList = document.querySelectorAll('.student-list li');
    const studentListArray = Array.from(studentListNodeList);
    let numberOfPages = Math.ceil(studentListArray.length / 10);

    /* determineStudentListSection will slice the array into a smaller 10 item sub-array
         with its contents dependent on the selected page number. */
    const determineStudentListSection = (pageNumber, studentList) => {
        let secondSliceNumber = pageNumber + (9 * pageNumber);
        let firstSliceNumber = secondSliceNumber - 10;
        let studentListSection = studentList.slice(firstSliceNumber, secondSliceNumber);
        for (let i = 0; i < studentListSection.length; i++) {
            studentListSection[i].style.display = 'list-item';
        }
        return studentListSection;
    }

    const determineNumberOfPages = (studentList) => {
        let numberOfPages = Math.ceil(studentList.length / 10);
        return numberOfPages;
    }

    // hides the list items 
    const hideList = (studentList) => {
        for (let i = 0; i < studentList.length; i++) {
            studentList[i].style.display = 'none';
        }
    }

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

    const appendPageLinks = (pageNumber, studentList) => {
        let paginationUL = document.querySelector('.pagination-ul');
        removeOldLinks();

        for (let i = 0; i < numberOfPages; i++) {
            let li = document.createElement('li');
            li.className = 'pagination-li';
            paginationUL.appendChild(li);
            let paginationLiNode = document.querySelectorAll('.pagination li');
            let paginationLiArray = Array.from(paginationLiNode);
            let a = document.createElement('a');
            paginationLiArray[i].appendChild(a);
            a.textContent = i + 1;
        }
    }

    const searchList = (text, studentList) => {
        let matchedStudents = [];
        let userSearch = text.toLowerCase();
        hideList(studentListArray);
        console.log(studentListArray[0].innerText.trim());
        for (i = 0; i < studentListArray.length; i++) {
            let student = studentListArray[i].innerText.trim().toLowerCase();
            if (student.includes(userSearch)) {
                matchedStudents.push(studentListArray[i]);
            }

            let li = document.createElement('li');
            li.textContent = 'Return to full list';
            li.className = 'return-button';
            let paginationUL = document.querySelector('.pagination-ul');
            paginationUL.appendChild(li);
            let a = document.createElement('a');
            li.appendChild(a);
        }
        let pagesForThisSearch = determineNumberOfPages(matchedStudents);
        showPage(1, matchedStudents);
    }

    /* kickstartPagination gets the process started. If only 1 page is needed (i.e. array items < 
    11) then no pagination is applied */
    const kickstartPagination = (pagesNeeded) => {
        if (pagesNeeded > 1) {
            hideList(studentListArray);
            let newPaginationDiv = document.createElement('div');
            newPaginationDiv.className = 'pagination';
            let newPaginationUL = document.createElement('ul');
            newPaginationUL.className = 'pagination-ul';
            studentListContainer.appendChild(newPaginationDiv);
            newPaginationDiv.appendChild(newPaginationUL);
            showPage(1, studentListArray);
        } else {
            return;
        }
    }
    kickstartPagination(numberOfPages);

    /* EVENT HANDLERS */
    const paginationLinkItems = document.getElementsByTagName('a');

    /* PAGINATION */
    for (let i = 0; i < paginationLinkItems.length; i++) {
        paginationLinkItems[i].addEventListener('click', (event) => {
            let newPageNumber = parseInt(event.target.textContent, 10);
            hideList(studentListArray);
            determineStudentListSection(newPageNumber, studentListArray);
            let activeLink = document.getElementsByTagName('a');
            for (let i = 0; i < activeLink.length; i++) {
                activeLink[i].className = '';
            }
            activeLink[newPageNumber - 1].className = 'active';
        });
    }

    const studentSearchForm = document.createElement('form');
    studentSearchForm.id = 'searchForm';
    pageHeader.appendChild(studentSearchForm);

    const studentSearchInput = document.createElement('input');
    studentSearchInput.type = 'text';
    studentSearchInput.name = 'name';
    studentSearchInput.placeholder = 'Search for students...';
    studentSearchForm.appendChild(studentSearchInput);

    const studentSearchButton = document.createElement('button');
    studentSearchButton.textContent = 'Search';
    studentSearchButton.type = 'submit';
    studentSearchButton.name = 'submit';
    studentSearchButton.value = 'submit';
    studentSearchForm.appendChild(studentSearchButton);


    /* SEARCH BUTTON */
    const form = document.getElementById('searchForm');
    const input = form.querySelector('input');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = input.value;
        searchList(text);
        input.value = '';

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
    });
});