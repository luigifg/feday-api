const dbo = require('../dbo/base')
const { messages } = require('joi-translation-pt-br')
const tableName = 'user'
const bcrypt = require('bcrypt')
const { object } = require('joi')

const post = async body => {
  user = await dbo.search(tableName, [
    { column: 'email', signal: '=', value: body.email }
  ])

  if (!user || user.length === 0) {
    return false
  }
  // console.log(body.password)
  // console.log(user.data[0].password)
  const isPasswordMatch = bcrypt.compareSync(
    body.password,
    user.data[0].password
  )

  if (!isPasswordMatch) {
    return false
  }

  return true
}

module.exports = {
post
}
