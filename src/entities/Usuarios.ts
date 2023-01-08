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

  @Column("text", { name: "userName" })
  userName: string;

  @Column("text", { name: "email" })
  email: string;

  @Column("text", { name: "password" })
  password: string;

  @Column("text", { name: "avatar" })
  avatar: string;

  @Column("int", { name: "nivel", nullable: true, default: () => "'1'" })
  nivel: number | null;

  @Column("int", { name: "exp", nullable: true, default: () => "'0'" })
  exp: number | null;

  @Column("enum", {
    name: "state",
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
  @JoinColumn([{ name: "nivel", referencedColumnName: "id" }])
  nivel2: Niveles;

  @OneToMany(
    () => UsuariosGanadores,
    (usuariosGanadores) => usuariosGanadores.usuario2
  )
  usuariosGanadores: UsuariosGanadores[];
}
