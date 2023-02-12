import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Rifas", { schema: "public" })
export class Rifas {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "tipoRifa", default: () => "0" })
  tipoRifa: number;

  @Column("integer", { name: "estadoRifa", default: () => "0" })
  estadoRifa: number;

  @Column("integer", { name: "usuario" })
  usuario: number;

  @Column("character varying", { name: "name" })
  name: string;

  @Column("character varying", { name: "description" })
  description: string;

  @Column("integer", { name: "posiblesGanadores" })
  posiblesGanadores: number;

  @Column("integer", { name: "costoOportunidad", default: () => "0" })
  costoOportunidad: number;

  @Column("integer", { name: "participantesTotales", default: () => "0" })
  participantesTotales: number;

  @Column("integer", { name: "montoRecaudado", default: () => "0" })
  montoRecaudado: number;

  @Column("character varying", { name: "image" })
  image: string;

  @Column("boolean", { name: "status", default: () => "true" })
  status: boolean;

  @Column("timestamp without time zone", { name: "startsAt" })
  startsAt: Date;

  @Column("timestamp without time zone", { name: "endsAt", nullable: true })
  endsAt: Date | null;

  @Column("timestamp without time zone", { name: "createAt" })
  createAt: Date;

  @Column("timestamp without time zone", { name: "updateAt", nullable: true })
  updateAt: Date | null;

  @Column("timestamp without time zone", { name: "deleteAt", nullable: true })
  deleteAt: Date | null;
}
