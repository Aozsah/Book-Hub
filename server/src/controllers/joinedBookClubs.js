const { JoinedBookClubs, BookClub, User } = require('../models');

exports.addJoinedBookClub = async (req, reply) => {
  try {
    const { userId, bookClubId } = req.body;

    // Önce kullanıcının bu kitap kulübüne daha önce üye olup olmadığını kontrol et
    const existingRecord = await JoinedBookClubs.findOne({
      where: { userId, bookClubId }
    });

    // Eğer kayıt zaten varsa, hata mesajı gönder
    if (existingRecord) {
      return reply.status(400).send({ message: 'User is already a member of this book club.' });
    }

    // Eğer kayıt yoksa, yeni kayıt oluştur
    const joinedBookClub = await JoinedBookClubs.create({ userId, bookClubId });
    reply.send(joinedBookClub);
  } catch (error) {
    // Hata durumunda, hata mesajını ve 500 status kodunu gönder
    reply.status(500).send(error);
  }
};


exports.getJoinedUsersByBookClub = async (req, reply) => {
  try {
    const { bookClubId } = req.params;
    console.log('Fetching users for bookClubId:', bookClubId);
    const joinedUsers = await JoinedBookClubs.findAll({
      where: { bookClubId },
      include: [{ model: User, attributes: ['username'] }],
    });
    console.log('Joined Users:', joinedUsers);
    reply.send(joinedUsers);
  } catch (error) {
    console.error('Error fetching joined users:', error);
    reply.status(500).send(error);
  }
};

exports.getJoinedBookClubsByUser = async (req, reply) => {
  try {
    const { userId } = req.params;
    const joinedBookClubs = await JoinedBookClubs.findAll({
      where: { userId },
      include: [BookClub],
    });
    reply.send(joinedBookClubs);
  } catch (error) {
    reply.status(500).send(error);
  }
};