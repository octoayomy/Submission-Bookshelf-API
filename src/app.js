/**
 * @Notes
 * - Jangan lupa untuk menjalankan `npm install` sebelum memulai server
 * - Kerjakan seluruh TODOs yang ada di file ini
 * - Setelah mengerjakan seluruh TODOs, jalankan `npm start` untuk menjalankan server
 * - Untuk memastikan server sudah berjalan, buka browser dan akses http://localhost:9000
 * - Uji proyeknya dengan Postman Collection yang sudah disediakan oleh Dicoding
 * - Pastikan seluruh test case yang ada di Postman berhasil
 * - Jika semua test case berhasil, maka kamu telah berhasil menyelesaikan submission ini
 * - Kirim proyek submission dengan cara mengarsipkan folder proyek menjadi format .zip
 */

const Hapi = require('@hapi/hapi');

const { addBook, getBooks, getBook, editBook, deleteBook} = require('./data'); // @TODO: ubah {} menjadi require('./data')

(async () => {
  const server = Hapi.server({
    // @TODO: ubah nilai undefined menjadi 9000
    host: 'localhost',
    port: 9000,
  });

  server.route([
    {
      // @TODO ubah nilai method menjadi 'POST'
      method: 'POST',
      path: '/books',
      handler: (request, h) => {
        try {
          const bookId = addBook(request.payload);
          const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
              bookId,
            }
          });
          response.code(201);
          return response;
        } catch (error) {
          const response = h.response({
            status: 'fail',
            message: error.message,
          });
          response.code(error.code);
          return response;
        }
      },
    },
    {
      method: 'GET',
      path: '/books',
      handler: () => {
        return {
          status: 'success',
          data: {
            books: getBooks(),
          }
        }
      }
    },
    {
      method: 'GET',
      // @TODO ubah path menjadi '/books/{bookId}'
      path: '/books/{bookId}',
      handler: (request, h) => {
        const { bookId } = request.params;
        const book = getBook(bookId);

        if (book) {
          return {
            status: 'success',
            data: {
              book,
            }
          }
        }

        const response = h.response({
          status: 'fail',
          message: 'Buku tidak ditemukan',
        });

        // @TODO tambahkan kode response.code(404) sebelum return response;
        response.code(404)
        return response;
      },
    },
    {
      method: 'PUT',
      path: '/books/{bookId}',
      handler: (request, h) => {
        try {
          // @TODO: ambil nilai bookId dari request.params
          const { bookId } = request.params;
          editBook(bookId, request.payload);

          return {
            status: 'success',
            message: 'Buku berhasil diperbarui',
          }
        } catch (error) {
          const response = h.response({
            status: 'fail',
            message: error.message,
          });

          response.code(error.code);
          return response;
        }
      },
    },
    {
      method: 'DELETE',
      path: '/books/{bookId}',
      handler: (request, h) => {
        try {
          const { bookId } = request.params;
          deleteBook(bookId);

          return {
            status: 'success',
            message: 'Buku berhasil dihapus',
          }
        } catch (error) {
          const response = h.response({
            // @TODO: ubah nilai status menjadi 'fail'
            status: 'fail',
            message: error.message,
          });

          response.code(error.code);
          return response;
        }
      }
    }
  ])

  // @TODO: tambahkan code untuk menjalankan server: await server.start();
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
})();
