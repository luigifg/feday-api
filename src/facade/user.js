const dbo = require("../dbo/base");
const validation = require("../model/user");
const { messages } = require("joi-translation-pt-br");
const tableName = "user";
const bcrypt = require("bcrypt");
const facade = require("../facade/userGroup");
const mailer = require("../config/mailer");
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
  try {
    // Verificação rápida dos campos obrigatórios
    const requiredFields = ["name", "company", "position", "email", "password", "confirmPassword"];
    for (const field of requiredFields) {
      if (!object[field]) {
        return { errors: [`O campo ${field} é obrigatório.`] };
      }
    }

    // Verificação de senha com regex
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*\-])(?=.{8,})/;
    if (!passwordRegex.test(object.password)) {
      return { errors: ["A senha deve ter no mínimo 8 caracteres contendo pelo menos 1 número, 1 letra maiúscula, 1 letra minúscula e 1 caractere especial."] };
    }

    // Verificar se o email já existe 
    if (object.email) {    
      const existingUser = await dbo.login(tableName, object.email);
      if (existingUser) {
        return { errors: ["Email já cadastrado no sistema. Por favor, use outro email."] };
      }
    }

    // Validação completa com Joi
    await validation.object.validateAsync(object, {
      abortEarly: false,
      messages: messages,
    });

    // Preparação do objeto para inserção
    delete object.confirmPassword;
    const originalPassword = object.password;
    object.password = await bcrypt.hash(object.password, saltRounds);

    // Inserção do usuário
    const newUser = await dbo.insert(object, tableName, ["id"]);

    // Tratamento de erros da inserção
    if (newUser && newUser.errors) {
      if (typeof newUser.errors === 'string' && newUser.errors.includes('Duplicate entry')) {
        return { errors: ["Email já cadastrado no sistema. Por favor, use outro email."] };
      }
      return { errors: [typeof newUser.errors === 'string' ? newUser.errors : "Erro ao criar usuário. Problema de conexão com o servidor."] };
    }

    // Criação do user_group se bem-sucedido
    if (newUser && newUser.length > 0) {
      const userId = newUser[0];
      await facade.insert({
        idUser: userId,
        idGroup: 1
      });
      
      // Retornar usuário com senha original para possibilitar envio de email no frontend
      return { 
        success: true, 
        user: { 
          id: userId, 
          ...object, 
          originalPassword 
        } 
      };
    }
    
    return { errors: ["Falha na criação do usuário. Por favor, tente novamente mais tarde."] };
  } catch (error) {
    console.error("Erro no processo:", error);
    return { 
      errors: error.details 
        ? error.details.map(el => el.message) 
        : [error.message || "Erro ao processar solicitação"] 
    };
  }
};

const update = async (object, id) => {
  if (!id) {
    console.log("ID não fornecido para atualização.");
    return false;
  }

  // Log para depuração
  console.log("Objeto recebido para atualização:", object);
  console.log("ID do usuário para atualização:", id);

  // Criar objeto para atualização (iremos adicionar campos conforme necessário)
  const updateObj = {};

  // Verificar se o campo nfcActivated está presente - processar diretamente sem validação
  if (object.nfcActivated !== undefined) {
    console.log(`Campo nfcActivated presente com valor: ${object.nfcActivated}`);
    // Garantir que seja armazenado como número (0 ou 1)
    updateObj.nfcActivated = object.nfcActivated === true || object.nfcActivated === 1 ? 1 : 0;
    console.log(`Valor de nfcActivated normalizado: ${updateObj.nfcActivated}`);
  }

  // Se tiver apenas nfcActivated, não precisa validar outros campos
  if (Object.keys(object).length === 1 && object.nfcActivated !== undefined) {
    console.log("Atualizando apenas o campo nfcActivated...");
    return await dbo.update(updateObj, id, tableName);
  }

  // Processar outros campos se presentes
  if (object.name !== undefined) updateObj.name = object.name;
  if (object.email !== undefined) updateObj.email = object.email;
  if (object.phone !== undefined) updateObj.phone = object.phone;
  if (object.company !== undefined) updateObj.company = object.company;
  if (object.position !== undefined) updateObj.position = object.position;
  if (object.status !== undefined) updateObj.status = object.status;

  // Se tiver senha, precisa processar especialmente
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
      // Validar apenas os campos relevantes
      const validationObj = { 
        password: object.password,
        confirmPassword: object.confirmPassword 
      };
      
      await validation.object.validateAsync(validationObj, {
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

    updateObj.password = hash;
  }

  console.log("Objeto final para atualização:", updateObj);
  console.log("Atualizando o usuário com ID:", id);
  return await dbo.update(updateObj, id, tableName);
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