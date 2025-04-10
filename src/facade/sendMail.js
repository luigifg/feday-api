const mailer = require('../config/mailer')
const dbo = require('../dbo/base')
const tableName = 'user'

const sendWelcomeEmail = async (userId, originalPassword) => {
    try {
      // Buscar dados do usuário pelo ID
      const user = await dbo.getById(userId, tableName)
      
      if (!user) {
        return { error: true, message: 'Usuário não encontrado' }
      }
      
      // Usar a senha original fornecida, ou criar uma senha temporária se não fornecida
      const passwordToSend = originalPassword || 'Senha temporária: Aa1!-2025';
      
      // Enviar email com os dados do usuário
      const emailSent = await mailer.sendWelcomeEmail({
        ...user,
        originalPassword: passwordToSend
      })
      
      if (!emailSent) {
        return { error: true, message: 'Falha ao enviar email' }
      }
      
      return { success: true }
    } catch (error) {
      console.error('Erro no envio de email:', error)
      return { error: true, message: error.message }
    }
  }

module.exports = {
  sendWelcomeEmail
}