import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("UsuariosGanadores", { schema: "public" })
export class UsuariosGanadores {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("boolean", { name: "entregado" })
  entregado: boolean;

  @Column("boolean", { name: "status", default: () => "true" })
  status: boolean;

  @Column("timestamp without time zone", { name: "createAt" })
  createAt: Date;

  @Column("timestamp without time zone", { name: "updateAt", nullable: true })
  updateAt: Date | null;

  @Column("timestamp without time zone", { name: "deleteAt", nullable: true })
  deleteAt: Date | null;

  @ManyToOne(
    () => UsuariosGanadores,
    (usuariosGanadores) => usuariosGanadores.usuariosGanadores,
    { onDelete: "SET NULL" }
  )
  @JoinColumn([{ name: "rifa", referencedColumnName: "id" }])
  rifa: UsuariosGanadores;

  @OneToMany(
    () => UsuariosGanadores,
    (usuariosGanadores) => usuariosGanadores.rifa
  )
  usuariosGanadores: UsuariosGanadores[];

  @ManyToOne(
    () => UsuariosGanadores,
    (usuariosGanadores) => usuariosGanadores.usuariosGanadores2,
    { onDelete: "SET NULL" }
  )
  @JoinColumn([{ name: "usuario", referencedColumnName: "id" }])
  usuario: UsuariosGanadores;

  @OneToMany(
    () => UsuariosGanadores,
    (usuariosGanadores) => usuariosGanadores.usuario
  )
  usuariosGanadores2: UsuariosGanadores[];
}
