const tableBody = document.querySelector("#tbody");

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
];

let library = DEFAULT_BOOKS;

function displayBooks() {
  tableBody.innerHTML = "";
  library.forEach((book) => {
    const oneBookRow = `
    <tr>
      <td class="p-3 text-sm text-gray-700 whitespace-nowrap">${book.title}</td>
      <td class="p-3 text-sm text-gray-700 whitespace-nowrap">${book.author}</td>
      <td class="p-3 text-sm text-gray-700 whitespace-nowrap hidden sm:table-cell">${book.pages}</td>
      <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
        <span class="read-status p-1.5 text-xs bg-gray-200 text-gray-700 bg-opacity-70 rounded font-semibold uppercase tracking-wider cursor-pointer">
        ${book.status}
        </span>
      </td>
      <td class="p-3 text-sm text-gray-700 whitespace-nowrap hidden sm:table-cell">
        <span class="p-1.5 text-xs bg-red-200 text-red-700 bg-opacity-70 rounded font-semibold uppercase tracking-wider cursor-pointer">
        DELETE
        </span>
      </td>
    </tr>
      `;
    tableBody.insertAdjacentHTML("afterbegin", oneBookRow);
  });
}

document.addEventListener("DOMContentLoaded", displayBooks());

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

tableBody.addEventListener("click", (e) => {
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
  displayBooks();
});
