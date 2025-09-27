import {
  IsString,
  Length,
  IsNumber,
  IsDateString,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class GetConsumidorDto {
  @IsString()
  @ApiProperty({ description: 'Numero de identidad del consumidor' })
  @Length(11, 11, {
    message: 'El numero de identidad debe tener 11 caracteres',
  })
  identidad_numero: string;
}

class Solicitud {
  @ApiProperty({ description: 'Numero de vacante' })
  @IsNumber()
  vacante: number;

  @ApiProperty({ description: 'Id de la oficina de registro de consumidores' })
  @IsNumber()
  oficina_id: number;

  @ApiProperty({ description: 'Id del comercio (bodega)' })
  @IsNumber()
  bodega_id: number;

  @ApiProperty({ description: 'Numero del nucleo de consumidores' })
  @IsNumber()
  numero_nucleo: number;

  @ApiProperty({ description: 'Fecha en que se realizo la solicitud' })
  @IsDateString()
  fecha: Date;

  @ApiProperty({ description: 'Id de la persona en la BD' })
  @IsString()
  persona_id: string;
}

export class EliminarSolicitudesDto {
  @ApiProperty({
    description: 'Lista de solicitudes a eliminar',
    example: [
      {
        vacante: 0,
        oficina_id: 123,
        bodega_id: 123,
        numero_nucleo: 321,
        fecha: '2025-09-27T14:29:38.933Z',
        persona_id: 'string',
      },
      {
        vacante: 0,
        oficina_id: 34,
        bodega_id: 756,
        numero_nucleo: 521,
        fecha: '2025-09-27T14:29:38.933Z',
        persona_id: 'string',
      },
    ],
  })
  @IsArray({ message: 'El campo solicitudes debe ser un arreglo' })
  @ValidateNested({
    each: true,
    message: 'La informacion sobre las solicitudes debe ser valida',
  })
  @Type(() => Solicitud)
  solicitudes: Solicitud[];
}

// export class ActualizarSolicitudDto {

// }
