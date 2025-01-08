const facade = require("../facade/validateAcl");

const validate = async (req, res, next) => {
  console.log('Cookies recebidos:', req.cookies);
  console.log('Cookie ID:', req.cookies.cookieID);
  if (req.cookies.cookieID) {
    const url = req.originalUrl.split("/")[1].split("?")[0];

    result = await facade.validateAcl(req.cookies.cookieID, `/${url}`);

    if (result === true) {
      return next();
    } else {
      return res.sendStatus(401);
    }
  } else {
    console.log("Não autorizado");
    return res.sendStatus(401);
  }
};

module.exports = { validate };
