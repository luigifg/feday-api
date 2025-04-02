const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendWelcomeEmail = async (user) => {
  try {
    const info = await transporter.sendMail({
      from: `"Future Day" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Bem-vindo ao Future Day 2025!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #2f855a;">Bem-vindo ao Future Day 2025!</h1>
          </div>
          <p>Olá <strong>${user.name}</strong>,</p>
          <p>Sua conta foi criada com sucesso. Estamos muito felizes em ter você conosco para o Future Day 2025!</p>
          <p>Detalhes da sua conta:</p>
          <ul>
            <li><strong>Nome:</strong> ${user.name}</li>
            <li><strong>Email:</strong> ${user.email}</li>
            <li><strong>Empresa:</strong> ${user.company}</li>
            <li><strong>Cargo:</strong> ${user.position}</li>
          </ul>
          <p>Você já pode acessar sua conta fazendo login em nosso site e escolher sua programação.</p>
          <p>Acesse o botão abaixo e vá direto para a área de seleção de eventos.</p>
          <div style="text-align: center; margin-top: 30px;">
            <a href="${process.env.FRONTEND_URL}/events" style="background-color: #2f855a; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Meus Eventos</a>
          </div>
          <p style="margin-top: 30px;">Se você tiver qualquer dúvida, sinta-se à vontade para nos contatar.</p>
          <p>Atenciosamente,<br>Equipe Future Day</p>
        </div>
      `,
    });

    console.log("Email enviado com sucesso:", info.messageId);
    return true;
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    return false;
  }
};

module.exports = {
  sendWelcomeEmail,
};
