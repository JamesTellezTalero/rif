import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Rifas } from "./Rifas";
import { Transacciones } from "./Transacciones";
import { Niveles } from "./Niveles";
import { UsuariosGanadores } from "./UsuariosGanadores";

@Index("id", ["id"], { unique: true })
@Index("Nivel", ["nivel"], {})
@Entity("Usuarios", { schema: "rif" })
export class Usuarios {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("text", { name: "UserName", nullable: true })
  userName: string | null;

  @Column("text", { name: "Email", nullable: true })
  email: string | null;

  @Column("text", { name: "Password", nullable: true })
  password: string | null;

  @Column("text", { name: "Avatar", nullable: true })
  avatar: string | null;

  @Column("int", { name: "Nivel", default: () => "'1'" })
  nivel: number;

  @Column("int", { name: "Exp", default: () => "'0'" })
  exp: number;

  @Column("enum", {
    name: "State",
    enum: ["false", "true"],
    default: () => "'true'",
  })
  state: "false" | "true";

  @OneToMany(() => Rifas, (rifas) => rifas.usuario2)
  rifas: Rifas[];

  @OneToMany(() => Transacciones, (transacciones) => transacciones.usuario2)
  transacciones: Transacciones[];

  @ManyToOne(() => Niveles, (niveles) => niveles.usuarios, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "Nivel", referencedColumnName: "id" }])
  nivel2: Niveles;

  @OneToMany(
    () => UsuariosGanadores,
    (usuariosGanadores) => usuariosGanadores.usuario2
  )
  usuariosGanadores: UsuariosGanadores[];
}
