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

  @Column("text", { name: "UserName" })
  userName: string;

  @Column("text", { name: "Email" })
  email: string;

  @Column("text", { name: "Password" })
  password: string;

  @Column("text", { name: "Avatar" })
  avatar: string;

  @Column("int", { name: "Nivel", nullable: true, default: () => "'1'" })
  nivel: number | null;

  @Column("int", { name: "Exp", nullable: true, default: () => "'0'" })
  exp: number | null;

  @Column("enum", {
    name: "State",
    nullable: true,
    enum: ["false", "true"],
    default: () => "'true'",
  })
  state: "false" | "true" | null;

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
