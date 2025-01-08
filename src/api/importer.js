const facadeProcessor = require("../facade/processor");

const importTxt = async (req, res) => {
  if (req.files) {
    for (let i = 0; i < req.files.length; i++) {
      const file = req.files[i];

      const idUser = req.cookies.cookieID;
      result = await processor("importTxt", idUser, file);

      if (typeof result[0] === "number") {
        return res.sendStatus(204);
      } else {
        return res.sendStatus(400);
      }
    }
  }
  return res.sendStatus(400);
};

const importXlsx = async (req, res) => {
  if (req.files) {
    for (let i = 0; i < req.files.length; i++) {
      const file = req.files[i];

      const idUser = req.cookies.cookieID;
      result = await processor("importXlsx", idUser, file);

      if (typeof result[0] === "number") {
        return res.sendStatus(204);
      } else {
        return res.sendStatus(400);
      }
    }
  }
  return res.sendStatus(400);
};

const importImage = async (req, res) => {

  console.log("importing image")
  if (!req.file) {
    return res.status(400).send("Nenhum arquivo enviado.");
  }

  const identificador = req.body.url;
  const nomeDoArquivo = req.file.originalname;
  const caminhoDoArquivo = req.file.path;

  const json = {
    fileName: nomeDoArquivo,
    filePath: caminhoDoArquivo,
  };

  const resultado = await processor("importarImagem", identificador, json); // Atualize o método do processador se necessário

  if (typeof resultado[0] === "number") {
    return res.sendStatus(204);
  } else {
    return res.sendStatus(400);
  }
};

const processor = async (operation, idUser, json, referralDate) => {
  if (referralDate) {
    json.referralDate = referralDate;
  }

  const object = {
    operation: operation,
    priority: 10,
    status: 0,
    idUser: idUser,
    bodyRequest: json,
    observation: "",
  };

  return await facadeProcessor.insert(object);
};

module.exports = {
  importTxt,
  importXlsx,
  importImage,
  processor
};
