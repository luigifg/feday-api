const app = require('./app')
const port = process.env.PORT || 3309

app.listen(port, () => {
  console.log(`Server UP: Port ${port} - Cors: ${process.env.CORS}`)
})
