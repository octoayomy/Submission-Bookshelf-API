const crypto = require('crypto');
const books = [];

function addBook(book) {
  const { name, readPage, pageCount } = book;

  if (!name) {
    const error = new Error('Gagal menambahkan buku. Mohon isi nama buku');
    error.code = 400;
    throw error;
  }

  if (readPage > pageCount) {
    const error = new Error('Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount');
    error.code = 400;
    throw error;
  }

  const id = crypto.randomUUID();
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  books.push({
    id,
    ...book,
    insertedAt,
    updatedAt,
  });

  return id;
}

function getBooks() {
  return books.map((book) => ({
    id: book.id,
    name: book.name,
    publisher: book.publisher,
  }));
}

function getBook(id) {
  const book = books.find((book) => book.id === id);

  if (!book) {
    return null;
  }
  const { readPage, pageCount } = book;

  return {
    ...book,
    finished: readPage === pageCount,
  }
}


function editBook(id, book) {
  const index = books.findIndex((book) => book.id === id);

  if (index === -1) {
    const error = new Error('Gagal memperbarui buku. Id tidak ditemukan')
    error.code = 404;
    throw error;
  }

  const { name, readPage, pageCount } = book;

  if (!name) {
    const error = new Error('Gagal memperbarui buku. Mohon isi nama buku');
    error.code = 400;
    throw error;
  }

  if (readPage > pageCount) {
    const error = new Error('Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount');
    error.code = 400;
    throw error;
  }

  books[index] = {
    ...books[index],
    ...book,
    updatedAt: new Date().toISOString(),
  };
}

function deleteBook(id) {
  const index = books.findIndex((book) => book.id === id);

  if (index === -1) {
    const error = new Error('Buku gagal dihapus. Id tidak ditemukan');
    error.code = 404;
    throw error;
  }

  books.splice(index, 1);
}

module.exports = {
  addBook,
  getBooks,
  getBook,
  editBook,
  deleteBook,
}
