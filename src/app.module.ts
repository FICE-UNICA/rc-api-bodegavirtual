import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import {
  Consumidor,
  Persona,
  TipoTramite,
  SolicitudTramite,
  Tramite,
} from './app.models';
import { AppService } from './app.service';

const models = [Consumidor, Persona, TipoTramite, SolicitudTramite, Tramite];

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT!),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: models,
    }),
    SequelizeModule.forFeature(models),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
