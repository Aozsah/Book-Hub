const { Book } = require('../models');

const getAllBooks = async (request, reply) => {
  try {
    const books = await Book.findAll();
    reply.send(books);
  } catch (error) {
    reply.code(500).send(error);
  }
};

const getBookById = async (request, reply) => {
  try {
    const book = await Book.findByPk(request.params.id);
    if (book) {
      reply.send(book);
    } else {
      reply.code(404).send({ message: 'Book not found' });
    }
  } catch (error) {
    reply.code(500).send(error);
  }
};

const createBook = async (request, reply) => {
  try {
    const parts = request.parts();
    let name, author, description, coverFile;

    for await (const part of parts) {
      if (part.fieldname === 'cover') {
        coverFile = await part.toBuffer();
      } else {
        const value = part.value;
        switch (part.fieldname) {
          case 'name':
            name = value;
            break;
          case 'author':
            author = value;
            break;
          case 'description':
            description = value;
            break;
        }
      }
    }

    request.log.info('Received fields:', { name, author, description });

    if (!coverFile) {
      request.log.error('Cover image is required');
      return reply.status(400).send('Cover image is required');
    }

    request.log.info('Cover file received:', { size: coverFile.length });

    const coverUrl = await request.server.uploadFileToAzure(coverFile, name + '-cover.jpg');

    request.log.info('Cover uploaded to Azure:', { coverUrl });

    const newBook = await Book.create({ name, author, description, cover: coverUrl });
    reply.code(201).send(newBook);
  } catch (error) {
    request.log.error('Error in createBook:', error);
    reply.code(500).send({ message: 'Internal Server Error', error: error.message });
  }
};

const deleteBook = async (request, reply) => {
  try {
    const book = await Book.findByPk(request.params.id);
    if (book) {
      await book.destroy();
      reply.send({ message: 'Book deleted' });
    } else {
      reply.code(404).send({ message: 'Book not found' });
    }
  } catch (error) {
    reply.code(500).send(error);
  }
};



module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  deleteBook,
  
};
