// const app = require('./app')
// const port = process.env.PORT || 3309

// app.listen(port, () => {
//   console.log(`Server UP: Port ${port} - Cors: ${process.env.CORS}`)
// })

const app = require('./app');
const cors = require('cors');
const port = process.env.PORT || 3309;

// Configurando o CORS para permitir apenas o endereço específico
app.use(
  cors({
    origin: 'https://feday-app.vercel.app',
  })
);

app.listen(port, () => {
  console.log(`Server UP: Port ${port} - Cors: https://feday-app.vercel.app`);
});
