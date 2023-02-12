import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("UsuariosGanadores", { schema: "public" })
export class UsuariosGanadores {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "rifa" })
  rifa: number;

  @Column("integer", { name: "participante" })
  participante: number;

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
}
