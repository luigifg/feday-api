const dbo = require("../dbo/base");
const validation = require("../model/participation.js");
const { messages } = require("joi-translation-pt-br");
const tableName = "participation";

const get = async (object) => {
  const limit = object.limit;
  const page = object.page;
  const userId = object.userId;

  if (userId) {
    return await dbo.getByUserId(tableName, userId, limit, page);
  }
  // Esta linha é importante: deve retornar todas as participações quando não há userId
  return await dbo.get(tableName, [], limit, page);
};

const getEventParticipantsCount = async () => {
  return await dbo.getEventParticipantsCount();
};

const getById = async (id) => {
  if (!id) return false;
  return await dbo.getById(tableName, id);
};

const insert = async (object) => {
  try {
    await validation.object.validateAsync(object, {
      abortEarly: false,
      messages: messages,
    });
  } catch (error) {
    const errors = error.details.map((el) => el.message);
    return { errors };
  }
  return await dbo.insert(object, tableName);
};

const update = async (object, id) => {
  if (!id) return false;
  try {
    await validation.object.validateAsync(object, {
      abortEarly: false,
      messages: messages,
    });
  } catch (error) {
    const errors = error.details.map((el) => el.message);
    return { errors };
  }
  return await dbo.update(object, id, tableName);
};

const remove = async (id) => {
  if (!id) return false;
  return await dbo.remove(id, tableName);
};

module.exports = {
  get,
  getById,
  getEventParticipantsCount,
  insert,
  update,
  remove,
};
