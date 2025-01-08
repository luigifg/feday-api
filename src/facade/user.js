const dbo = require("../dbo/base");
const validation = require("../model/user");
const { messages } = require("joi-translation-pt-br");
const tableName = "user";
const bcrypt = require("bcrypt");
const facade = require("../facade/userGroup");
const saltRounds = 10;

const get = async (object) => {
  const limit = object.limit;
  const page = object.page;

  if (object.id) {
    const params = { column: "id", value: `%${object.id}%`, operator: "like" };
    return await dbo.get(tableName, limit, page, params);
  }
  if (object.name) {
    const params = {
      column: "name",
      value: `%${object.name}%`,
      operator: "like",
    };
    return await dbo.get(tableName, limit, page, params);
  }
  if (object.email) {
    const params = {
      column: "email",
      value: `%${object.email}%`,
      operator: "like",
    };
    return await dbo.get(tableName, limit, page, params);
  }
  if (object.status) {
    const params = {
      column: "status",
      value: `%${object.status}%`,
      operator: "like",
    };
    return await dbo.get(tableName, limit, page, params);
  }
  return await dbo.get(tableName, limit, page);
};

const insert = async (object) => {
  console.log("Iniciando o processo de criação de usuário...");

  try {
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;

    // Validação manual com regex
    if (!passwordRegex.test(object.password)) {
      console.log("Erro de validação: Senha não atende os requisitos.");
      throw new Error(
        "A senha deve ter no mínimo 8 caracteres contendo pelo menos 1 número, 1 letra maiúscula, 1 letra minúscula e 1 caractere especial."
      );
    }

    // Validação com Joi
    await validation.object.validateAsync(object, {
      abortEarly: false,
      messages: messages,
    });
  } catch (error) {
    console.error("Erro na validação dos dados do usuário:", error);
    if (error.details) {
      const errors = error.details.map((el) => el.message);
      return { errors };
    } else {
      return { errors: [error.message] };
    }
  }

  // Remover confirmPassword antes de salvar no banco
  delete object.confirmPassword;

  // Gerar hash da senha
  console.log("Gerando hash da senha...");
  const hash = await new Promise((resolve, reject) => {
    bcrypt.hash(object.password, saltRounds, function (err, hash) {
      if (err) {
        console.error("Erro ao gerar hash da senha:", err);
        reject(err);
      }
      resolve(hash);
    });
  });

  object.password = hash;

  console.log("Inserindo o usuário na tabela...");
  const newUser = await dbo.insert(object, tableName, ["email"]); // Inserir usuário

  console.log("Resultado da inserção do usuário:", newUser);

  // Verifica se a inserção foi bem-sucedida
  if (newUser && newUser.length > 0) {
    const userId = newUser[0];
    console.log("Usuário criado com sucesso. ID do usuário:", userId);

    // Criação do user group
    const userGroup = {
      idUser: userId, // ID do usuário recém-criado
      idGroup: 1, // Associar ao grupo de ID '1'
    };

    console.log("Inserindo o usuário no grupo...");
    const userGroupResponse = await facade.insert(userGroup);

    if (userGroupResponse.errors) {
      console.error("Erro ao criar user_group:", userGroupResponse.errors);
    } else {
      console.log("Usuário associado ao grupo com sucesso.");
    }
  } else {
    console.error("Falha na criação do usuário. Nenhum ID retornado.");
  }

  return newUser;
};

const update = async (object, id) => {
  if (!id) {
    console.log("ID não fornecido para atualização.");
    return false;
  }

  if (object.password) {
    console.log("Validando e atualizando senha do usuário...");

    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;

    if (!passwordRegex.test(object.password)) {
      console.error(
        "Erro de validação da senha. Senha não atende os requisitos."
      );
      return {
        errors: [
          "A senha deve ter no mínimo 8 caracteres contendo pelo menos 1 número, 1 letra maiúscula, 1 letra minúscula e 1 caractere especial.",
        ],
      };
    }

    try {
      await validation.object.validateAsync(object, {
        abortEarly: false,
        messages: messages,
      });
    } catch (error) {
      console.error(
        "Erro na validação dos dados durante a atualização:",
        error
      );
      if (error.details) {
        const errors = error.details.map((el) => el.message);
        return { errors };
      } else {
        return { errors: [error.message] };
      }
    }

    // Remover confirmPassword antes de salvar no banco
    delete object.confirmPassword;

    // Gerar hash da senha
    console.log("Gerando hash da nova senha...");
    const hash = await new Promise((resolve, reject) => {
      bcrypt.hash(object.password, saltRounds, function (err, hash) {
        if (err) {
          console.error("Erro ao gerar hash da nova senha:", err);
          reject(err);
        }
        resolve(hash);
      });
    });

    object.password = hash;
  }

  console.log("Atualizando o usuário com ID:", id);
  return await dbo.update(object, id, tableName);
};

const remove = async (id) => {
  if (!id) {
    console.log("ID não fornecido para remoção.");
    return false;
  }
  console.log("Removendo usuário com ID:", id);
  return await dbo.remove(id, tableName);
};

module.exports = {
  get,
  insert,
  update,
  remove,
};
