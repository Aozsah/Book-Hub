const { Comment, User, Book } = require('../models');

exports.addComment = async (req, reply) => {
  try {
    const { userId, bookId, comment } = req.body;
    const newComment = await Comment.create({ userId, bookId, comment });
    reply.send(newComment);
  } catch (error) {
    reply.status(500).send(error);
  }
};

exports.getCommentsByBook = async (req, reply) => {
  try {
    const { bookId } = req.params;
    const comments = await Comment.findAll({
      where: { bookId },
      include: [
        { model: User, attributes: ['id', 'username', 'email'] },
        { model: Book, attributes: ['id', 'name'] },
      ],
    });
    reply.send(comments);
  } catch (error) {
    reply.status(500).send(error);
  }
};
