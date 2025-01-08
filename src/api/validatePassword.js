const facade = require("../facade/validatePassword")

const post = async (req, res) => {
  const object = req.body
  const result = await facade.post(object)

  return res.status(200).send(result)
}

module.exports = {
  post,
}
