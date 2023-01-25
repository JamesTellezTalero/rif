import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Usuarios } from "./Usuarios";

@Entity("Niveles", { schema: "public" })
export class Niveles {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "nombre" })
  nombre: string;

  @Column("integer", { name: "ganancias" })
  ganancias: number;

  @Column("integer", { name: "totalExp" })
  totalExp: number;

  @Column("character varying", { name: "color" })
  color: string;

  @Column("character varying", { name: "borde" })
  borde: string;

  @Column("integer", { name: "multiplicadorEXP" })
  multiplicadorExp: number;

  @Column("boolean", { name: "status", default: () => "true" })
  status: boolean;

  @Column("timestamp without time zone", { name: "createAt" })
  createAt: Date;

  @Column("timestamp without time zone", { name: "updateAt", nullable: true })
  updateAt: Date | null;

  @Column("timestamp without time zone", { name: "deleteAt", nullable: true })
  deleteAt: Date | null;

  @OneToMany(() => Usuarios, (usuarios) => usuarios.nivel)
  usuarios: Usuarios[];
}
