import { Body, Controller, Delete, Get, Patch, Query } from '@nestjs/common';
import { AppService } from './app.service';
import {
  ActualizarSolicitudDto,
  EliminarSolicitudesDto,
  GetConsumidorDto,
} from './app.dtos';

@Controller('/')
export class AppController {
  constructor(private appService: AppService) {}
  @Get('get-consumidor')
  async getConsumidor(@Query() query: GetConsumidorDto) {
    return await this.appService.getConsumidor(query);
  }

  @Get('listar-tipos-tramites')
  async listarTramites() {
    return await this.appService.listarTramites();
  }

  @Get('listar-solicitudes')
  async listarSolicitudes() {
    return await this.appService.listarSolicitudes();
  }

  @Delete('eliminar-solicitud')
  async eliminarSolicitudes(@Body() body: EliminarSolicitudesDto) {
    return await this.appService.eliminarSolicitudes(body);
  }

  @Patch('actualizar-solicitud')
  async actualizarSolicitud(@Body() body: ActualizarSolicitudDto) {
    return await this.appService.actualizarSolicitud(body);
  }
}
