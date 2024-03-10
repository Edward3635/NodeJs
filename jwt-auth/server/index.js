import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import router from './router/index.js'
import errorMiddleware from './middlewares/error-middleware.js'

dotenv.config()
const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(
	cors({
		credentials: true,
		origin: process.env.CLIENT_URL
	})
)
app.use('/api', router)
app.use(errorMiddleware)

const start = async () => {
	try {
		await mongoose.connect(
			'mongodb+srv://root:rootAdmin@authorization.8szgfti.mongodb.net/?retryWrites=true&w=majority&appName=authorization'
		)
		app.listen(PORT, () => console.log(`Server started on PORT = ${process.env.DB_URL}`))
	} catch (error) {
		console.log(error)
	}
}

start()
