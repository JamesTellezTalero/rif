import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Rifas } from "./Rifas";
import { Transacciones } from "./Transacciones";
import { Niveles } from "./Niveles";

@Entity("Usuarios", { schema: "public" })
export class Usuarios {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "userName" })
  userName: string;

  @Column("character varying", { name: "email" })
  email: string;

  @Column("character varying", { name: "password" })
  password: string;

  @Column("character varying", { name: "avatar" })
  avatar: string;

  @Column("integer", { name: "exp", default: () => "0" })
  exp: number;

  @Column("boolean", { name: "status", default: () => "true" })
  status: boolean;

  @Column("timestamp without time zone", { name: "createAt" })
  createAt: Date;

  @Column("timestamp without time zone", { name: "updateAt" })
  updateAt: Date;

  @Column("timestamp without time zone", { name: "deleteAt" })
  deleteAt: Date;

  @OneToMany(() => Rifas, (rifas) => rifas.usuario)
  rifas: Rifas[];

  @OneToMany(() => Transacciones, (transacciones) => transacciones.usuario)
  transacciones: Transacciones[];

  @ManyToOne(() => Niveles, (niveles) => niveles.usuarios, {
    onDelete: "SET NULL",
  })
  @JoinColumn([{ name: "nivel", referencedColumnName: "id" }])
  nivel: Niveles;
}
