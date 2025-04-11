const facade = require("../facade/me");

const getById = async (req, res) => {
  const id = req.cookies.cookieID;  // Verifica o cookie "cookieID"
  console.log("ID do cookie:", id);  // Log do ID do cookie recebido

  if (!id) {
    console.log("Cookie não encontrado, usuário não autenticado.");  // Log quando o cookie não é encontrado
    return res.status(401).send("Usuário não autenticado");
  }

  try {
    const result = await facade.getById(id);
    // console.log("Resultado da consulta no banco:", result);  // Log do resultado da consulta ao banco
    if (result) {
      // console.log("Usuário encontrado:", result);  // Log quando o usuário for encontrado
      return res.status(200).send(result);
    } else {
      // console.log("Usuário não encontrado no banco.");  // Log caso o usuário não seja encontrado
      return res.sendStatus(404);  // Caso não encontre o usuário no banco
    }
  } catch (error) {
    console.error("Erro no servidor:", error);  // Log para capturar erros no servidor
    return res.status(500).send("Erro no servidor");
  }
};

module.exports = {
  getById,
};
