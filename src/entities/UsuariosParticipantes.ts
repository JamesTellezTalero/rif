import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("UsuariosParticipantes", { schema: "public" })
export class UsuariosParticipantes {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "usuario" })
  usuario: number;

  @Column("boolean", { name: "status", default: () => "true" })
  status: boolean;

  @Column("timestamp without time zone", { name: "createAt" })
  createAt: Date;

  @Column("timestamp without time zone", { name: "updateAt", nullable: true })
  updateAt: Date | null;

  @Column("timestamp without time zone", { name: "deleteAt", nullable: true })
  deleteAt: Date | null;

  @ManyToOne(
    () => UsuariosParticipantes,
    (usuariosParticipantes) => usuariosParticipantes.usuariosParticipantes,
    { onDelete: "SET NULL" }
  )
  @JoinColumn([{ name: "rifa", referencedColumnName: "id" }])
  rifa: UsuariosParticipantes;

  @OneToMany(
    () => UsuariosParticipantes,
    (usuariosParticipantes) => usuariosParticipantes.rifa
  )
  usuariosParticipantes: UsuariosParticipantes[];
}
