const { User } = require('../models');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const getAllUsers = async (request, reply) => {
  try {
    const users = await User.findAll();
    reply.send(users);
  } catch (error) {
    reply.code(500).send(error);
  }
};

const getUserById = async (request, reply) => {
  try {
    const userId = request.params.id;
    const user = await User.findByPk(userId);

    if (!user) {
      return reply.code(404).send({ message: 'Kullanıcı bulunamadı.' });
    }

    reply.send(user);
  } catch (error) {
    reply.code(500).send(error);
  }
};

const login = async (request, reply) => {
  try {
    const { username, password } = request.body;
    const user = await User.findOne({ where: { username } });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return reply.code(401).send({ message: 'Kullanıcı adı veya şifre yanlış.' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '48h' });
    reply.send({ message: 'Giriş başarılı.', token, id: user.id, username: user.username });
  } catch (error) {
    reply.code(500).send(error);
  }
};

const register = async (request, reply) => {
  try {
    const { username, password, email, description } = request.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = await User.create({ username, password: hashedPassword, email, description });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '48h' });
    reply.code(201).send({ message: 'Kullanıcı başarıyla oluşturuldu.', token });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      reply.code(400).send({ message: 'Bu e-posta adresi zaten kullanılıyor.' });
    } else {
      reply.code(500).send(error);
    }
  }
};

const updateProfilePicture = async (request, reply) => {
  try {
    const userId = request.params.id;
    const parts = request.parts();
    let profilePictureFile;

    for await (const part of parts) {
      if (part.fieldname === 'profilePicture') {
        profilePictureFile = await part.toBuffer();
      }
    }

    if (!profilePictureFile) {
      return reply.status(400).send('Profile picture is required');
    }

    const profilePictureUrl = await request.server.uploadFileToAzure(profilePictureFile, `user-${userId}-profile.jpg`);

    await User.update({ profilePicture: profilePictureUrl }, { where: { id: userId } });
    reply.code(200).send({ message: 'Profile picture updated successfully', profilePictureUrl });
  } catch (error) {
    reply.code(500).send({ message: 'Internal Server Error', error: error.message });
  }
};

const updateUserDescription = async (request, reply) => {
  try {
    const userId = request.params.id;
    const { description } = request.body;

    const [updated] = await User.update({ description }, { where: { id: userId } });

    if (updated) {
      const updatedUser = await User.findByPk(userId);
      return reply.code(200).send({ message: 'Description updated successfully', user: updatedUser });
    }

    throw new Error('User not found');
  } catch (error) {
    reply.code(500).send({ message: 'Internal Server Error', error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  login,
  register,
  updateProfilePicture,
  updateUserDescription
};
