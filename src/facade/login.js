const dbo = require('../dbo/base')
const { messages } = require('joi-translation-pt-br')
const tableName = 'user'
const bcrypt = require('bcrypt')

const post = async body => {
  if (!body.email || !body.password) {
    // Usuario ou senha não informado
    return 400
  }
  user = await dbo.login(tableName, body.email)


  if (!user || user.length === 0) {
    // Usuario não encontrado
    return 401
  }

  if (user.status === 0) {
    // Usuário inativo
    return 403
  }
  // console.log("Senha", body.password, user.password)

  const isPasswordMatch = bcrypt.compareSync(body.password, user.password)
  if (!isPasswordMatch) {
    // Senha incorreta
    return 401
  }

  delete user.password
  // return user
  return user
}

module.exports = {
  post
}
