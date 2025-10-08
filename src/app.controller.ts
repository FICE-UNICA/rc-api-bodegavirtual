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
  ListarTramitesConsumidorDto,
} from './app.dtos';
import { ApiOperation } from '@nestjs/swagger';

@Controller('/')
export class AppController {
  constructor(private appService: AppService) {}

  @ApiOperation({ summary: 'Obtener información de un consumidor' })
  @Get('get-consumidor')
  async getConsumidor(@Query() query: GetConsumidorDto) {
    Logger.debug('GET /get-consumidor' + ' query: ' + JSON.stringify(query));
    return await this.appService.getConsumidor(query);
  }

  @ApiOperation({ summary: 'Obtener listado de consumidores' })
  @Get('listar-consumidores')
  async listarConsumidores(@Query() query: ListarConsumidoresDto) {
    Logger.debug(
      'GET /listar-consumidores' + ' query: ' + JSON.stringify(query),
    );
    return await this.appService.listarConsumidores(query);
  }

  @ApiOperation({
    summary: 'Obtener listado de tipos de trámites que se pueden solicitar',
  })
  @Get('listar-tipos-tramites')
  async listarTramites() {
    Logger.debug('GET /listar-tipos-tramites');
    return await this.appService.listarTramites();
  }

  @ApiOperation({
    summary: 'Obtener listado de solicitudes',
  })
  @Get('listar-solicitudes')
  async listarSolicitudes(@Query() query: ListarSolicitudesDto) {
    Logger.debug(
      'GET /listar-solicitudes' + ' query: ' + JSON.stringify(query),
    );
    return await this.appService.listarSolicitudes(query);
  }

  @ApiOperation({
    summary: 'Eliminar una solicitud',
  })
  @Delete('eliminar-solicitud')
  async eliminarSolicitudes(@Body() body: EliminarSolicitudesDto) {
    Logger.debug(
      'DELETE /eliminar-solicitud' + ' body: ' + JSON.stringify(body),
    );
    return await this.appService.eliminarSolicitudes(body);
  }

  @ApiOperation({
    summary: 'Actualizar el estado de una solicitud',
  })
  @Patch('actualizar-solicitud')
  async actualizarSolicitud(@Body() body: ActualizarSolicitudDto) {
    Logger.debug(
      'PATCH /actualizar-solicitud' + ' body: ' + JSON.stringify(body),
    );
    return await this.appService.actualizarSolicitud(body);
  }

  @ApiOperation({
    summary: 'Crear una solicitud',
  })
  @Post('crear-solicitud')
  async crearSolicitud(@Body() body: CrearSolicitudDto) {
    Logger.debug('POST /crear-solicitud' + ' body: ' + JSON.stringify(body));
    return await this.appService.crearSolicitud(body);
  }

  @ApiOperation({
    summary: 'Listar tramites de un consumidor',
  })
  @Get('listar-tramites-consumidor')
  async listarTramitesConsumidor(@Query() query: ListarTramitesConsumidorDto) {
    Logger.debug(
      'GET /listar-tramites-consumidor' + ' query: ' + JSON.stringify(query),
    );
    return await this.appService.listarTramitesConsumidor(query);
  }
}
