const { BookClub } = require('../models');

const getAllBookClubs = async (request, reply) => {
  try {
    const bookClubs = await BookClub.findAll();
    reply.send(bookClubs);
  } catch (error) {
    request.log.error('Error in getAllBookClubs:', { error: error.message, stack: error.stack });
    reply.code(500).send(error);
  }
};

const getBookClubById = async (request, reply) => {
  try {
    const bookClub = await BookClub.findByPk(request.params.id);
    if (bookClub) {
      reply.send(bookClub);
    } else {
      reply.code(404).send({ message: 'Book Club not found' });
    }
  } catch (error) {
    request.log.error('Error in getBookClubById:', { error: error.message, stack: error.stack });
    reply.code(500).send(error);
  }
};

const createBookClub = async (request, reply) => {
  try {
    const parts = request.parts();
    let name, description, logoFile, meetinglink;

    for await (const part of parts) {
      if (part.fieldname === 'logo') {
        logoFile = await part.toBuffer();
      } else {
        const value = part.value;
        switch (part.fieldname) {
          case 'name':
            name = value;
            break;
          case 'description':
            description = value;
            break;
          case 'meetinglink':
            meetinglink = value;
            break;
        }
      }
    }

    request.log.info('Received fields:', { name, description, meetinglink });

    if (!logoFile) {
      request.log.error('Logo image is required');
      return reply.status(400).send('Logo image is required');
    }

    request.log.info('Logo file received:', { size: logoFile.length });

    const logoUrl = await request.server.uploadFileToAzure(logoFile, name + '-logo.jpg');

    request.log.info('Logo uploaded to Azure:', { logoUrl });

    const newBookClub = await BookClub.create({ name, description, bookclubimg: logoUrl, meetinglink });
    reply.code(201).send(newBookClub);
  } catch (error) {
    request.log.error('Error in createBookClub:', { error: error.message, stack: error.stack });
    reply.code(500).send({ message: 'Internal Server Error', error: error.message });
  }
};

const updateBookClub = async (request, reply) => {
  try {
    const parts = request.parts();
    let name, description, logoFile, meetinglink;

    for await (const part of parts) {
      if (part.fieldname === 'logo') {
        logoFile = await part.toBuffer();
      } else {
        const value = part.value;
        switch (part.fieldname) {
          case 'name':
            name = value;
            break;
          case 'description':
            description = value;
            break;
          case 'meetinglink':
            meetinglink = value;
            break;
        }
      }
    }

    request.log.info('Received fields for update:', { name, description, meetinglink });

    const bookClub = await BookClub.findByPk(request.params.id);
    if (!bookClub) {
      request.log.error('Book Club not found');
      return reply.status(404).send({ message: 'Book Club not found' });
    }

    if (logoFile) {
      const logoUrl = await request.server.uploadFileToAzure(logoFile, name + '-logo.jpg');
      request.log.info('Updated logo uploaded to Azure:', { logoUrl });
      bookClub.bookclubimg = logoUrl;
    }

    bookClub.name = name || bookClub.name;
    bookClub.description = description || bookClub.description;
    bookClub.meetinglink = meetinglink || bookClub.meetinglink;

    await bookClub.save();

    reply.code(200).send(bookClub);
  } catch (error) {
    request.log.error('Error in updateBookClub:', { error: error.message, stack: error.stack });
    reply.code(500).send({ message: 'Internal Server Error', error: error.message });
  }
};

const deleteBookClub = async (request, reply) => {
  try {
    const bookClub = await BookClub.findByPk(request.params.id);
    if (bookClub) {
      await bookClub.destroy();
      reply.send({ message: 'Book Club deleted' });
    } else {
      reply.code(404).send({ message: 'Book Club not found' });
    }
  } catch (error) {
    request.log.error('Error in deleteBookClub:', { error: error.message, stack: error.stack });
    reply.code(500).send(error);
  }
};

module.exports = {
  getAllBookClubs,
  getBookClubById,
  createBookClub,
  updateBookClub,
  deleteBookClub,
};
