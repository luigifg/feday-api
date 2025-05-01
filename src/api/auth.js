const facade = require("../facade/validateAcl");

// src/api/auth.js - Modificar a função validate
const validate = async (req, res, next) => {
  let userId = null;
  let authMethod = 'none';
  
  // Verificar cookie primeiro
  if (req.cookies && req.cookies.cookieID) {
    userId = req.cookies.cookieID;
    authMethod = 'cookie';
  } 
  // Se não tiver ID do usuário, não está autenticado
  if (!userId) {
    return res.status(401).json({ error: 'Autenticação requerida' });
  }
  
  // Resto do código para validar o usuário usando o userId...
  
  // Adicionar método de autenticação para diagnóstico
  req.authMethod = authMethod;
  
  next();
};

module.exports = { validate };
