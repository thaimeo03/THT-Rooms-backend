import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import * as cookieParser from 'cookie-parser'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)

  app.enableCors({
    credentials: true,
    origin: configService.get('CLIENT_URL')
  })
  app.use(cookieParser())
  app.useGlobalPipes(new ValidationPipe())

  await app.listen(configService.get('PORT'))
}
bootstrap()
