const { ReadBooks, User, Book } = require('../models');

exports.addReadBook = async (req, reply) => {
  try {
    const { userId, bookId } = req.body;

    // Önce kullanıcının bu kitabı daha önce okuduğunu kontrol et
    const existingRecord = await ReadBooks.findOne({
      where: { userId, bookId }
    });

    // Eğer kayıt zaten varsa, hata mesajı gönder
    if (existingRecord) {
      return reply.status(400).send({ message: 'User has already marked this book as read.' });
    }

    // Eğer kayıt yoksa, yeni kayıt oluştur
    const readBook = await ReadBooks.create({ userId, bookId });
    reply.send(readBook);
  } catch (error) {
    // Hata durumunda, hata mesajını ve 500 status kodunu gönder
    reply.status(500).send(error);
  }
};

exports.getReadBooksByUser = async (req, reply) => {
  try {
    const { userId } = req.params;
    const readBooks = await ReadBooks.findAll({
      where: { userId },
      include: [Book],
    });
    reply.send(readBooks);
  } catch (error) {
    reply.status(500).send(error);
  }
};

exports.getUsersByBookId = async (req, reply) => {
  try {
    const { bookId } = req.params;
    const readBooks = await ReadBooks.findAll({
      where: { bookId },
      include: [{ model: User, attributes: ['id', 'username'] }],
    });
    const users = readBooks.map(rb => rb.User);
    reply.send(users);
  } catch (error) {
    reply.status(500).send(error);
  }
};
