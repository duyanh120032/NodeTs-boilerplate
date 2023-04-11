import { CREDENTIALS } from './config/index'
import express from 'express'
import compression from 'compression'
import productRoute from '~/routes/product.route'
import helmet from 'helmet'
import hpp from 'hpp'
import cookieParser from 'cookie-parser'
import errorMiddleware from '~/middlewares/error.middleware'
import cors from 'cors'
import connectDB from './database'
import authRoute from '~/routes/auth.route'
import passport from '~/config/passport'
import morgan from 'morgan'

const app = express()
connectDB()
// set up middlewares
app.use(
  cors({
    credentials: CREDENTIALS
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(hpp())
app.use(compression())
app.use(helmet())
app.use(cookieParser())
app.use(morgan('combined'))
app.use(passport.initialize())

// catch all routes

// set up routes

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/products', productRoute)
// authRoute
app.use('/auth', authRoute)

// catch 404 and forward to error handler
app.use(errorMiddleware)

export default app
