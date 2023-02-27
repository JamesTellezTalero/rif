import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ParticipantesRifa } from "./ParticipantesRifa";
import { Rifas } from "./Rifas";

@Entity("GanadoresRifa", { schema: "public" })
export class GanadoresRifa {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("boolean", { name: "entregado" })
  entregado: boolean;

  @Column("boolean", { name: "status", default: () => "true" })
  status: boolean;

  @Column("timestamp without time zone", { name: "createAt", nullable: true })
  createAt: Date | null;

  @Column("timestamp without time zone", { name: "updateAt", nullable: true })
  updateAt: Date | null;

  @Column("timestamp without time zone", { name: "deleteAt", nullable: true })
  deleteAt: Date | null;

  @ManyToOne(
    () => ParticipantesRifa,
    (participantesRifa) => participantesRifa.ganadoresRifas,
    { onDelete: "SET NULL" }
  )
  @JoinColumn([{ name: "participanteRifa", referencedColumnName: "id" }])
  participanteRifa: ParticipantesRifa;

  @ManyToOne(() => Rifas, (rifas) => rifas.ganadoresRifas, {
    onDelete: "SET NULL",
  })
  @JoinColumn([{ name: "rifa", referencedColumnName: "id" }])
  rifa: Rifas;
}
