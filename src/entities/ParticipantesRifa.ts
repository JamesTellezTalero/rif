import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { GanadoresRifa } from "./GanadoresRifa";
import { Participantes } from "./Participantes";
import { Rifas } from "./Rifas";
import { Transacciones } from "./Transacciones";

@Entity("ParticipantesRifa", { schema: "public" })
export class ParticipantesRifa {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("boolean", { name: "status", default: () => "false" })
  status: boolean;

  @Column("timestamp without time zone", { name: "createAt", nullable: true })
  createAt: Date | null;

  @Column("timestamp without time zone", { name: "updateAt", nullable: true })
  updateAt: Date | null;

  @Column("timestamp without time zone", { name: "deleteAt", nullable: true })
  deleteAt: Date | null;

  @OneToMany(
    () => GanadoresRifa,
    (ganadoresRifa) => ganadoresRifa.participanteRifa
  )
  ganadoresRifas: GanadoresRifa[];

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
