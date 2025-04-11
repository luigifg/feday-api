const dbo = require('../dbo/base');
const validation = require('../model/userGroup');
const { messages } = require('joi-translation-pt-br');
const tableName = 'user_group';

const get = async (object) => {
  // console.log('Buscando user groups com os filtros:', object);

  const { limit, page, order, direction, ...filterParams } = object;

  const fields = [`${tableName}.*`];

  const filterMap = {
    id: '=',
    idUser: '=',
    idGroup: '=',
  };

  const filters = Object.entries(filterParams).reduce((acc, [key, value]) => {
    if (filterMap[key]) {
      acc.push({ column: key, operator: filterMap[key], value });
    }
    return acc;
  }, []);

  console.log('Filtros aplicados:', filters);

  return await dbo.get(tableName, filters, limit, page, order, direction, fields);
};

const insert = async (object) => {
  // console.log('Iniciando inserção no user_group:', object);

  try {
    await validation.object.validateAsync(object, {
      abortEarly: false,
      messages: messages,
    });
  } catch (error) {
    console.error('Erro na validação dos dados do user_group:', error);
    const errors = error.details.map((el) => el.message);
    return { errors };
  }

  const result = await dbo.insert(object, tableName, ['idUser', 'idGroup']); // Garantindo que o usuário não seja duplicado para o mesmo grupo
  // console.log('Resultado da inserção no user_group:', result);

  return result;
};

const update = async (object, id) => {
  if (!id) {
    console.log('ID não fornecido para atualização do user_group.');
    return false;
  }

  try {
    await validation.object.validateAsync(object, {
      abortEarly: false,
      messages: messages,
    });
  } catch (error) {
    console.error('Erro na validação dos dados durante a atualização do user_group:', error);
    const errors = error.details.map((el) => el.message);
    return { errors };
  }

  console.log('Atualizando user_group com ID:', id);
  return await dbo.update(object, id, tableName);
};

const remove = async (id) => {
  if (!id) {
    console.log('ID não fornecido para remoção do user_group.');
    return false;
  }
  console.log('Removendo user_group com ID:', id);
  return await dbo.remove(id, tableName);
};

module.exports = {
  get,
  insert,
  update,
  remove,
};
