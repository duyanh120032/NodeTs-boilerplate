import app from './app'
import dotenv from 'dotenv'
import chalk from 'chalk'
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'

dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` })

const { PORT = 3000 } = process.env
function initializeSwagger() {
  const options = {
    swaggerDefinition: {
      info: {
        title: 'REST API',
        version: '1.0.0',
        description: 'Example docs'
      }
    },
    apis: ['swagger.yaml']
  }

  const specs = swaggerJSDoc(options)
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
}
initializeSwagger()
app.listen(PORT, () => {
  console.log(chalk.greenBright(`Server is running on port ${PORT}`))
})
