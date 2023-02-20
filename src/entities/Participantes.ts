import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { GanadoresRifa } from "./GanadoresRifa";
import { TipoDocumento } from "./TipoDocumento";
import { ParticipantesRifa } from "./ParticipantesRifa";

@Entity("Participantes", { schema: "public" })
export class Participantes {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "nombre" })
  nombre: string;

  @Column("character varying", { name: "email" })
  email: string;

  @Column("character varying", { name: "documento" })
  documento: string;

  @Column("character varying", { name: "telefono" })
  telefono: string;

  @Column("boolean", { name: "status", default: () => "true" })
  status: boolean;

  @Column("timestamp without time zone", { name: "createAt" })
  createAt: Date;

  @Column("timestamp without time zone", { name: "updateAt", nullable: true })
  updateAt: Date | null;

  @Column("timestamp without time zone", { name: "deleteAt", nullable: true })
  deleteAt: Date | null;

  @OneToMany(() => GanadoresRifa, (ganadoresRifa) => ganadoresRifa.participante)
  ganadoresRifas: GanadoresRifa[];

  @ManyToOne(
    () => TipoDocumento,
    (tipoDocumento) => tipoDocumento.participantes,
    { onDelete: "SET NULL" }
  )
  @JoinColumn([{ name: "tipoDocumento", referencedColumnName: "id" }])
  tipoDocumento: TipoDocumento;

  @OneToMany(
    () => ParticipantesRifa,
    (participantesRifa) => participantesRifa.participante
  )
  participantesRifas: ParticipantesRifa[];
}
