import express from 'express'
import morgan from 'morgan'
import lifecycle from './middleware/lifecycle.js'
import router from "./routers/router.js"

const app = express()

app.use(morgan('tiny'))
app.use(lifecycle({
  async setup() {
    // This runs before all your handlers
    // Put your database connection here. e.g.
    // await mongoose.connect(process.env.DATABASE_URL)
  },
  async cleanup() {
    // This runs after all your handlers
    // Put your database disconnection here. e.g.
    // await mongoose.disconnect()
  }
}))

// Feel free to use a router and move this elsewhere.
app.use(router);

// Don't use app.listen. Instead export app.
export default app