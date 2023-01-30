import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Participantes } from "./Participantes";
import { Rifas } from "./Rifas";

@Entity("UsuariosParticipantes", { schema: "public" })
export class UsuariosParticipantes {
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

  @ManyToOne(
    () => Participantes,
    (participantes) => participantes.usuariosParticipantes,
    { onDelete: "SET NULL" }
  )
  @JoinColumn([{ name: "participante", referencedColumnName: "id" }])
  participante: Participantes;

  @ManyToOne(() => Rifas, (rifas) => rifas.usuariosParticipantes, {
    onDelete: "SET NULL",
  })
  @JoinColumn([{ name: "rifa", referencedColumnName: "id" }])
  rifa: Rifas;
}