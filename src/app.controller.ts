import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  Logger,
} from '@nestjs/common';
import { AppService } from './app.service';
import {
  ActualizarSolicitudDto,
  CrearSolicitudDto,
  EliminarSolicitudesDto,
  GetConsumidorDto,
  ListarSolicitudesDto,
  ListarConsumidoresDto,
} from './app.dtos';

@Controller('/')
export class AppController {
  constructor(private appService: AppService) {}
  @Get('get-consumidor')
  async getConsumidor(@Query() query: GetConsumidorDto) {
    Logger.debug('GET /get-consumidor' + ' query: ' + JSON.stringify(query));
    return await this.appService.getConsumidor(query);
  }

  @Get('listar-consumidores')
  async listarConsumidores(@Query() query: ListarConsumidoresDto) {
    Logger.debug(
      'GET /listar-consumidores' + ' query: ' + JSON.stringify(query),
    );
    return await this.appService.listarConsumidores(query);
  }

  @Get('listar-tipos-tramites')
  async listarTramites() {
    Logger.debug('GET /listar-tipos-tramites');
    return await this.appService.listarTramites();
  }

  @Get('listar-solicitudes')
  async listarSolicitudes(@Query() query: ListarSolicitudesDto) {
    Logger.debug(
      'GET /listar-solicitudes' + ' query: ' + JSON.stringify(query),
    );
    return await this.appService.listarSolicitudes(query);
  }

  @Delete('eliminar-solicitud')
  async eliminarSolicitudes(@Body() body: EliminarSolicitudesDto) {
    Logger.debug(
      'DELETE /eliminar-solicitud' + ' body: ' + JSON.stringify(body),
    );
    return await this.appService.eliminarSolicitudes(body);
  }

  @Patch('actualizar-solicitud')
  async actualizarSolicitud(@Body() body: ActualizarSolicitudDto) {
    Logger.debug(
      'PATCH /actualizar-solicitud' + ' body: ' + JSON.stringify(body),
    );
    return await this.appService.actualizarSolicitud(body);
  }

  @Post('crear-solicitud')
  async crearSolicitud(@Body() body: CrearSolicitudDto) {
    Logger.debug('POST /crear-solicitud' + ' body: ' + JSON.stringify(body));
    return await this.appService.crearSolicitud(body);
  }
}
