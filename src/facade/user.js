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
    // Verificar campos obrigatórios
    const requiredFields = ["name", "company", "position", "email", "password", "confirmPassword"];
    for (const field of requiredFields) {
      if (!object[field]) {
        return { errors: [`O campo ${field} é obrigatório.`] };
      }
    }

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
    
    // NOVA VERIFICAÇÃO: Verificar se o email já existe antes de prosseguir
    if (object.email) {    
      // CORREÇÃO: Usar dbo.login em vez de db diretamente
      const existingUser = await dbo.login(tableName, object.email);
      
      if (existingUser) {
        console.log(`Email '${object.email}' já está cadastrado.`);
        return { errors: ["Email já cadastrado no sistema. Por favor, use outro email."] };
      }
    }
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

  const originalPassword = object.password;

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
  // Usamos o insert original do dbo, sem modificá-lo
  const newUser = await dbo.insert(object, tableName, ["id"]);

  console.log("Resultado da inserção do usuário:", newUser);

  // Verifica se houve erro na inserção
  if (newUser && newUser.errors) {
    console.error("Erro ao inserir usuário:", newUser.errors);
    
    // Verifica o tipo de erro para dar mensagens mais específicas
    if (typeof newUser.errors === 'string') {
      if (newUser.errors.includes('Duplicate entry') || newUser.errors.includes('duplicate key')) {
        return { errors: ["Email já cadastrado no sistema. Por favor, use outro email."] };
      }
      return { errors: [newUser.errors] };
    }
    return { errors: ["Erro ao criar usuário. Tente novamente."] };
  }

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
    
    // Iniciar envio de e-mail sem esperar a conclusão
    try {
      object.id = userId;
      // IMPORTANTE: Não usar await aqui para não bloquear o fluxo
      mailer.sendWelcomeEmail({ ...object, originalPassword })
        .then(() => console.log("Email de boas-vindas enviado com sucesso para:", object.email))
        .catch(err => console.error("Erro ao enviar email de boas-vindas:", err));
    } catch (emailError) {
      console.error("Erro ao iniciar envio de email:", emailError);
    }
  } else {
    console.error("Falha na criação do usuário. Nenhum ID retornado.");
    return { errors: ["Falha na criação do usuário. Por favor, tente novamente mais tarde."] };
  }
  
  return newUser;
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