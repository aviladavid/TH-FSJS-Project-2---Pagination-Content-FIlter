/*
    TreeHouse Techdegree Full Stack JavaScript
    Project 2: Pagination & Content Filter
                        ***** AIMING FOR EXCEEDS EXPECTATIONS *****
WHAT IT DOES:
    This JavaScript code is intended to handle pagination dynamically given an HTML list of any 
    size. The objective is that for any list exceeding 10 student profiles a pagination system 
    kicks in to only show 10 profiles per page. It should always provide the user with the search 
    feature.

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
    let initialNumberOfPages = Math.ceil(studentListArray.length / 10);

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
        let pages = determineNumberOfPages(studentList);
        for (let i = 0; i < pages; i++) {
            let li = newPageElement('li', 'className', 'pagination-li');
            paginationUL.appendChild(li);
            let paginationLiNode = document.querySelectorAll('.pagination li');
            let paginationLiArray = Array.from(paginationLiNode);
            let a = newPageElement('a', 'textContent', i + 1);
            paginationLiArray[i].appendChild(a);
        }
        const paginationLinkItems = document.getElementsByTagName('a');
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
    }

    const newPageElement = (elementName, property1, propertyValue1, property2, propertyValue2, property3, propertyValue3) => {
        const newElement = document.createElement(elementName);
        newElement[property1] = propertyValue1;
        newElement[property2] = propertyValue2;
        newElement[property3] = propertyValue3;
        return newElement;
    }

    const searchList = (text, studentList) => {
        let matchedStudents = [];
        let userSearch = text.toLowerCase();
        hideList(studentListArray);
        for (i = 0; i < studentListArray.length; i++) {
            let student = studentListArray[i].innerText.trim().toLowerCase();
            if (student.includes(userSearch)) {
                matchedStudents.push(studentListArray[i]);
            }
        }
        let pagesForThisSearch = determineNumberOfPages(matchedStudents);
        showPage(pagesForThisSearch, matchedStudents);
        let li = newPageElement('li', 'className', '');
        let paginationUL = document.querySelector('.pagination-ul');
        paginationUL.appendChild(li);
        let a = newPageElement('a', 'textContent', 'Back to full list!', 'id', 'backButton');
        li.appendChild(a);
        const backButton = document.getElementById('backButton');
        backButton.addEventListener('click', () => {
            kickstartPagination(initialNumberOfPages);
        });
    }

    /* kickstartPagination gets the process started. If only 1 page is needed (i.e. array items < 
    11) then no pagination is applied */
    const kickstartPagination = (pagesNeeded) => {
        if (pagesNeeded > 1) {
            hideList(studentListArray);
            let newPaginationDiv = newPageElement('div', 'className', 'pagination');
            let newPaginationUL = newPageElement('ul', 'className', 'pagination-ul');
            studentListContainer.appendChild(newPaginationDiv);
            newPaginationDiv.appendChild(newPaginationUL);
            showPage(1, studentListArray);
        } else {
            return;
        }
    }
    kickstartPagination(initialNumberOfPages);

    /* SEARCH FORM */
    const studentSearchForm = newPageElement('form', 'id', 'searchForm');
    pageHeader.appendChild(studentSearchForm);
    const studentSearchInput = newPageElement('input', 'type', 'text', 'name', 'name', 'placeholder', 'Search for students...');
    studentSearchForm.appendChild(studentSearchInput);
    const studentSearchButton = newPageElement('button', 'type', 'submit', 'textContent', 'Search');
    studentSearchForm.appendChild(studentSearchButton);

    /* FORM HANDLER*/
    const form = document.getElementById('searchForm');
    const input = form.querySelector('input');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = input.value;
        searchList(text);
        input.value = '';
    });
});