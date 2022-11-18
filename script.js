'use strict';

const books = document.querySelector('.books');
const btn = document.querySelector('.btn');
const form = document.querySelector('form');
const submit = document.querySelector('.submit');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const read = document.querySelector('#read');

const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  let book = new Book(title, author, pages, read);
  myLibrary.push(book);
  displayBook();
}

function displayBook() {
  const removeDivs = document.querySelectorAll('.card');
  for (let i = 0; i < removeDivs.length; i++) {
    removeDivs[i].remove();
  }

  let index = 0;

  myLibrary.forEach((myLibrarys) => {
    const card = document.createElement('div');
    card.classList.add('card');
    books.appendChild(card);

    const removeButton = document.createElement('button');
    removeButton.classList.add('remove-button');
    removeButton.textContent = 'Remove';

    removeButton.dataset.arr = index;

    removeButton.addEventListener('click', function () {
      myLibrary.splice(parseInt(removeButton.dataset.arr), 1);
      card.remove();
      displayBook();
    });

    const toggleButton = document.createElement('button');
    toggleButton.classList.add('toggle-button');
    toggleButton.textContent = 'Read';

    toggleButton.dataset.arr = index;

    toggleButton.addEventListener('click', function () {
      Book.prototype = Object.create(Book.prototype);
      const toggleBook = new Book();

      if (myLibrary[parseInt(toggleButton.dataset.arr)].read == 'Yes') {
        toggleBook.read = 'No';
        myLibrary[parseInt(toggleButton.dataset.arr)].read = toggleBook.read;
      } else if (myLibrary[parseInt(toggleButton.dataset.arr)].read == 'No') {
        toggleBook.read = 'Yes';
        myLibrary[parseInt(toggleButton.dataset.arr)].read = toggleBook.read;
      }
      displayBook();
    });

    for (let key in myLibrarys) {
      const paragraph = document.createElement('p');
      paragraph.textContent = `${key}: ${myLibrarys[key]}`;
      card.appendChild(paragraph);
    }

    card.appendChild(toggleButton);
    card.appendChild(removeButton);

    index++;
  });
}

btn.addEventListener('click', function (e) {
  form.classList.toggle('hidden');
});

submit.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    title.value == '' ||
    author.value == '' ||
    pages.value == '' ||
    read.value == ''
  ) {
    return;
  }
  addBookToLibrary(title.value, author.value, pages.value, read.value);
  form.reset();
});
