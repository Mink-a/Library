const tableBody = document.querySelector("#tbody");
const bookList = document.querySelector("#bookList");
// Form elements
const form = document.querySelector("form");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const readStatus = document.querySelector("#status");
const newBookBtn = document.querySelector("#newBookBtn");

newBookBtn.addEventListener("click", (e) => {
  if (e.target.innerText === "ADD NEW BOOK") {
    form.classList.remove("hidden");
    e.target.classList.add("mt-4");
    e.target.innerText = "close";
  } else if (e.target.innerText === "CLOSE") {
    form.classList.add("hidden");
    e.target.classList.remove("mt-4");
    e.target.innerText = "ADD NEW BOOK";
  }
});

const DEFAULT_BOOKS = [
  {
    title: "JavaScript: The Definitive Guide",
    author: "David Flanagan",
    pages: 706,
    status: "READ",
  },
  {
    title: "Eloquent JavaScript",
    author: "Marijn Haverbeke ",
    pages: 543,
    status: "NOT READ",
  },
  {
    title: "Secrets of the JavaScript Ninja",
    author: "Bear Bibeault",
    pages: 431,
    status: "READ",
  },
  {
    title: "Programming TypeScript",
    author: "Boris Cherny",
    pages: 321,
    status: "NOT READ",
  },
  {
    title: "The Road To React",
    author: "Robin Wieruch",
    pages: 288,
    status: "NOT READ",
  },
];

let library = [];
document.addEventListener("DOMContentLoaded", displayBooks());

// Create Book Object
class Book {
  constructor(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addNewbookToLibrary();
  clearForm();
  displayBooks();
});

// Add new Book to Library Array
function addNewbookToLibrary() {
  let newBook = new Book(
    title.value,
    author.value,
    pages.value,
    readStatus.value
  );
  library.push(newBook);
  updateLocalStorage();
}

// Clear Form
function clearForm() {
  title.value = "";
  author.value = "";
  pages.value = "";
}

// Render Books
function displayBooks() {
  checkLocalStorage();
  tableBody.innerHTML = "";
  library.forEach((book) => {
    const oneBookRow = `
    <tr>
      <td class="p-3 text-sm text-gray-700 whitespace-nowrap">${book.title}</td>
      <td class="p-3 text-sm text-gray-700 whitespace-nowrap hidden sm:table-cell">${book.author}</td>
      <td class="p-3 text-sm text-gray-700 whitespace-nowrap hidden sm:table-cell">${book.pages}</td>
      <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
        <span class="read-status p-1.5 text-xs bg-gray-200 text-gray-700 bg-opacity-70 rounded font-semibold uppercase tracking-wider cursor-pointer">
        ${book.status}
        </span>
      </td>
      <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
        <span class="p-1.5 text-xs bg-red-200 text-red-700 bg-opacity-70 rounded font-semibold uppercase tracking-wider cursor-pointer">
        DELETE
        </span>
      </td>
    </tr>
      `;
    tableBody.insertAdjacentHTML("afterbegin", oneBookRow);
  });
}

// Find the index of book in library
function findBookInLibrary(library, bookTitle) {
  for (let book of library) {
    if (book.title === bookTitle) {
      return library.indexOf(book);
    }
  }
}

// Delete Book
function deleteBook(bookId) {
  library.splice(bookId, 1);
}
// deleteBook(2)

// change read status
function changeReadStatus(bookId) {
  if (library[bookId].status === "READ") {
    library[bookId].status = "NOT READ";
  } else {
    library[bookId].status = "READ";
  }
}
// changeReadStatus(2);

bookList.addEventListener("click", (e) => {
  let currentBookTitle = e.target.parentNode.parentNode.childNodes[1].innerText;
  // console.log(currentBookTitle);
  let bookId = findBookInLibrary(library, currentBookTitle);

  // Delete book if click delete button
  if (e.target.innerText === "DELETE") {
    deleteBook(bookId);
  }

  // Change status if click on read o/ not read button
  if (e.target.classList.contains("read-status")) {
    changeReadStatus(bookId);
  }
  updateLocalStorage();
  displayBooks();
});

// LOCAL STORAGE
function updateLocalStorage() {
  localStorage.setItem("library", JSON.stringify(library));
}

function checkLocalStorage() {
  if (localStorage.getItem("library")) {
    library = JSON.parse(localStorage.getItem("library"));
  } else {
    library = DEFAULT_BOOKS;
  }
}
