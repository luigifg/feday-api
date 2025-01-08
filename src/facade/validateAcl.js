const dbo = require("../dbo/base");

const validateAcl = async (idUser, path) => {
  const result = await dbo.validateAcl(idUser, path);
  console.log("resultado", result);
  if (result) {
    return true;
  }
  return false;
};

module.exports = {
  validateAcl,
};
