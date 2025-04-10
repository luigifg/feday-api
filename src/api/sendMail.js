const facade = require('../facade/sendMail')

const sendWelcomeEmail = async (req, res) => {
    try {
      const { userId, originalPassword } = req.body
      
      if (!userId) {
        return res.status(400).json({ error: 'ID do usuário não fornecido' })
      }
      
      const result = await facade.sendWelcomeEmail(userId, originalPassword)
      
      if (result.error) {
        return res.status(500).json({ error: result.message })
      }
      
      return res.status(200).json({ success: true, message: 'Email enviado com sucesso' })
    } catch (error) {
      console.error('Erro ao processar envio de email:', error)
      return res.status(500).json({ error: 'Erro ao processar envio de email' })
    }
  }

module.exports = {
  sendWelcomeEmail
}