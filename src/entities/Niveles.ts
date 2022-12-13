import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Usuarios } from "./Usuarios";

@Index("id", ["id"], { unique: true })
@Entity("Niveles", { schema: "rif" })
export class Niveles {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "Monto", nullable: true })
  monto: number | null;

  @Column("text", { name: "Color", nullable: true })
  color: string | null;

  @Column("text", { name: "Borde", nullable: true })
  borde: string | null;

  @Column("int", { name: "Miltiplicador EXP", nullable: true })
  miltiplicadorExp: number | null;

  @OneToMany(() => Usuarios, (usuarios) => usuarios.nivel2)
  usuarios: Usuarios[];
}
