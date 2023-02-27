import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Participantes } from "./Participantes";
import { Rifas } from "./Rifas";
import { Transacciones } from "./Transacciones";

@Entity("ParticipantesRifa", { schema: "public" })
export class ParticipantesRifa {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("boolean", { name: "status", default: () => "true" })
  status: boolean;

  @Column("timestamp without time zone", { name: "createAt" })
  createAt: Date;

  @Column("timestamp without time zone", { name: "updateAt", nullable: true })
  updateAt: Date | null;

  @Column("timestamp without time zone", { name: "deleteAt", nullable: true })
  deleteAt: Date | null;

  @Column("boolean", { name: "aproved", default: () => "false" })
  aproved: boolean;

  @ManyToOne(
    () => Participantes,
    (participantes) => participantes.participantesRifas,
    { onDelete: "SET NULL" }
  )
  @JoinColumn([{ name: "participante", referencedColumnName: "id" }])
  participante: Participantes;

  @ManyToOne(() => Rifas, (rifas) => rifas.participantesRifas, {
    onDelete: "SET NULL",
  })
  @JoinColumn([{ name: "rifa", referencedColumnName: "id" }])
  rifa: Rifas;

  @OneToMany(
    () => Transacciones,
    (transacciones) => transacciones.participanterifa
  )
  transacciones: Transacciones[];
}
