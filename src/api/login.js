const facade = require("../facade/login")
const moment = require("moment")

const post = async (req, res) => {
  const object = req.body
  const result = await facade.post(object)

  if (typeof result === "number") {
    return res.sendStatus(result)
  }

  if (result && result.length != 0 && result.status === 1) {
    const expiration = moment().add(1, "hours").toDate()

    res.cookie("cookieID", result.id, {
      expires: expiration,
      httpOnly: true,
      secure: true,  // Necessário em HTTPS
      sameSite: 'None',  // Permite cookies entre origens

    })
    delete result.password
  }

  return res.status(200).send(result)
}

module.exports = {
  post,
}
