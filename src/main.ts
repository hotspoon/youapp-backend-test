import { NestFactory } from "@nestjs/core"
import { ValidationPipe, VersioningType } from "@nestjs/common"
import { AppModule } from "./app.module"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
import { IoAdapter } from "@nestjs/platform-socket.io"

const PORT = parseInt(process.env.PORT, 10) || 4000

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({ origin: "*" })
  app.useGlobalPipes(new ValidationPipe({}))
  app.enableVersioning({ type: VersioningType.URI })

  app.useWebSocketAdapter(new IoAdapter(app))

  const options = new DocumentBuilder()
    .setTitle("YouApp API Documentation")
    .setDescription("YouApp API Documentation")
    .setVersion("1.0")
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup("api-docs", app, document)

  await app.listen(PORT, () => {
    console.info(`running at port ${PORT}`)
  })
}

bootstrap()
