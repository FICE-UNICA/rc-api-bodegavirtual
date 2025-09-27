import { Column, HasOne, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({ tableName: 'dat_personas', schema: 'public', timestamps: false })
export class Persona extends Model {
  @PrimaryKey
  @Column
  declare persona_sid: string;

  @Column
  declare identidad_numero: string;

  @Column
  declare primer_nombre: string;

  @Column
  declare segundo_nombre: string;

  @Column
  declare primer_apellido: string;

  @Column
  declare segundo_apellido: string;

  @Column
  declare sexo: string;

  @Column
  declare direccion: string;

  @Column
  declare nacimiento_fecha: Date;
}

@Table({ tableName: 'dat_consumidores', schema: 'public', timestamps: false })
export class Consumidor extends Model {
  @PrimaryKey
  @Column
  declare oficina_id: number;

  @PrimaryKey
  @Column
  declare bodega_id: number;

  @PrimaryKey
  @Column
  declare numero_nucleo: number;

  @PrimaryKey
  @Column
  declare vacante: boolean;

  @PrimaryKey
  @Column
  declare persona_id: string;

  @HasOne(() => Persona, 'persona_sid')
  declare persona: Persona;
}

@Table({ tableName: 'nom_tipos_tramites', schema: 'public', timestamps: false })
export class TipoTramite extends Model {
  @Column
  declare nombre: string;

  @Column
  declare denominacion: string;

  @Column
  declare fecha_desde: Date;
}

@Table({
  tableName: 'dat_tramites_solicitudes',
  schema: 'public',
  timestamps: false,
})
export class SolicitudTramite extends Model {
  @PrimaryKey
  @Column
  declare oficina_id: number;

  @PrimaryKey
  @Column
  declare bodega_id: number;

  @PrimaryKey
  @Column
  declare numero_nucleo: number;

  @PrimaryKey
  @Column
  declare vacante: boolean;

  @PrimaryKey
  @Column
  declare persona_id: string;

  @PrimaryKey
  @Column
  declare fecha: Date;

  @Column
  declare estado: string;

  @Column
  declare tipo_tramite_id: number;
}
