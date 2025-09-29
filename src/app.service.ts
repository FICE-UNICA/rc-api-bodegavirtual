import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Consumidor, TipoTramite, SolicitudTramite } from './app.models';
import {
  ActualizarSolicitudDto,
  CrearSolicitudDto,
  EliminarSolicitudesDto,
  GetConsumidorDto,
} from './app.dtos';
import { QueryTypes } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Consumidor) private consumidorModel: typeof Consumidor,
    @InjectModel(TipoTramite) private tramiteModel: typeof TipoTramite,
    @InjectModel(SolicitudTramite)
    private solicitudModel: typeof SolicitudTramite,
    private sequelize: Sequelize,
  ) {}

  async getConsumidor(query: GetConsumidorDto) {
    try {
      const consumidor = await this.consumidorModel.findAll({
        include: ['persona'],
        where: [{ '$persona.identidad_numero$': query.identidad_numero }],
      });

      return consumidor;
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  async listarTramites() {
    try {
      const tramites = await this.tramiteModel.findAll({
        attributes: ['id', 'nombre', 'denominacion'],
      });

      return tramites;
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  async listarSolicitudes() {
    try {
      const solicitudes =
        (await this.sequelize?.query(
          `SELECT dts.fecha, dts.estado, ntt.nombre as tramite_solicitado, ntt.denominacion,
        (dp.primer_nombre || ' ' || dp.primer_apellido || ' ' || dp.segundo_apellido)
        as solicitante,
        dts.oficina_id, dts.bodega_id, dts.numero_nucleo, dts.vacante, dts.persona_id
      FROM dat_tramites_solicitudes dts
      join nom_tipos_tramites ntt
      on dts.tipo_tramite_id = ntt.id
      join dat_consumidores dc
      on dc.vacante = dts.vacante
      and dc.persona_id = dts.persona_id
      and dc.numero_nucleo = dts.numero_nucleo
      and dc.bodega_id = dts.bodega_id
      and dc.oficina_id = dts.oficina_id
      join dat_personas dp
      on dp.persona_sid = dc.persona_id


      `,
          { type: QueryTypes.SELECT },
        )) ?? [];

      return solicitudes;
    } catch (error) {
      Logger.error(error);
      throw new Error('Error al listar solicitudes');
    }
  }

  async eliminarSolicitudes(body: EliminarSolicitudesDto) {
    const transaction = await this.sequelize?.transaction();
    try {
      for (const solicitud of body.solicitudes) {
        await this.solicitudModel.destroy({
          where: {
            persona_id: solicitud.persona_id,
            numero_nucleo: solicitud.numero_nucleo,
            bodega_id: solicitud.bodega_id,
            oficina_id: solicitud.oficina_id,
            vacante: solicitud.vacante,
          },
          transaction,
        });
      }

      await transaction.commit();

      return { message: 'Solicitudes eliminadas exitosamente' };
    } catch (error) {
      await transaction.rollback();
      Logger.error(error);
      throw new Error('Error al eliminar solicitudes');
    }
  }

  async actualizarSolicitud(body: ActualizarSolicitudDto) {
    try {
      await this.solicitudModel.update(
        { estado: body.estado },
        {
          where: {
            persona_id: body.persona_id,
            numero_nucleo: body.numero_nucleo,
            bodega_id: body.bodega_id,
            oficina_id: body.oficina_id,
            vacante: body.vacante,
          },
        },
      );

      return { message: 'Solicitud actualizada exitosamente' };
    } catch (error) {
      Logger.error(error);
      throw new Error('Error al actualizar solicitud');
    }
  }

  async crearSolicitud(body: CrearSolicitudDto) {
    try {
      const solicitud = await this.solicitudModel.create({
        ...body,
        estado: 'PENDIENTE',
        fecha: new Date(),
      });
      return solicitud;
    } catch (error) {
      Logger.error(error);
      throw new Error('Error al crear solicitud');
    }
  }
}
