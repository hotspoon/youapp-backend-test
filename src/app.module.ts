import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { UserModule } from "./module/user/user.module"
import { AuthModule } from "./module/auth/auth.module"
import { ClientsModule, Transport } from "@nestjs/microservices"
import { ChatModule } from "./module/chat/chat.module"

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>("DATABASE_URL")
      })
    }),
    ClientsModule.register([
      {
        name: "CHAT_SERVICE",
        transport: Transport.RMQ,
        options: {
          urls: ["amqp://localhost:5672"],
          queue: "chat_queue"
        }
      }
    ]),
    UserModule,
    AuthModule,
    ChatModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
