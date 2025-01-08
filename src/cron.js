const CronJob = require("cron").CronJob
const processor = require("./processor")

const app = require("./app")

const port = process.env.PROCESSOR || 3307

app.listen(port, () => {
  console.log(`Processor UP: Port ${port}`)
})

let running = false

const job = new CronJob(

  // "*/1 * * * *", // Roda a cada 1 minuto
  "*/10 * * * * *", // Roda a cada 10 segundos
  
  async () => {
    if (!running) {
      try {
        running = true
        await processor.start()
      } catch (error) {
      } finally {
        running = false
      }
    }
  },
  null,
  true,
  "America/Los_Angeles"
)
