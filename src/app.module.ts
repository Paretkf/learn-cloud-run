import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MongooseModule } from '@nestjs/mongoose'
import { CatsModule } from './cat/cat.module'
import { ConfigModule } from '@nestjs/config'
@Module({
  imports: [
    CatsModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb+srv://admin:1234@camp-db-staging-negt0.mongodb.net/CAMP?retryWrites=true&w=majority')
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
