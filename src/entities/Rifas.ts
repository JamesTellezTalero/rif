import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { EstadosRifa } from "./EstadosRifa";
import { TiposRifa } from "./TiposRifa";
import { Usuarios } from "./Usuarios";
import { Transacciones } from "./Transacciones";
import { UsuariosGanadores } from "./UsuariosGanadores";
import { UsuariosParticipantes } from "./UsuariosParticipantes";

@Entity("Rifas", { schema: "public" })
export class Rifas {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "name" })
  name: string;

  @Column("character varying", { name: "description" })
  description: string;

  @Column("integer", { name: "posiblesGanadores" })
  posiblesGanadores: number;

  @Column("integer", { name: "costoOportunidad", default: () => "0" })
  costoOportunidad: number;

  @Column("integer", { name: "participantesTotales", default: () => "0" })
  participantesTotales: number;

  @Column("integer", { name: "montoRecaudado", default: () => "0" })
  montoRecaudado: number;

  @Column("character varying", { name: "image" })
  image: string;

  @Column("boolean", { name: "status", default: () => "true" })
  status: boolean;

  @Column("timestamp without time zone", { name: "createAt" })
  createAt: Date;

  @Column("timestamp without time zone", { name: "updateAt", nullable: true })
  updateAt: Date | null;

  @Column("timestamp without time zone", { name: "deleteAt", nullable: true })
  deleteAt: Date | null;

  @ManyToOne(() => EstadosRifa, (estadosRifa) => estadosRifa.rifas, {
    onDelete: "SET NULL",
  })
  @JoinColumn([{ name: "estadoRifa", referencedColumnName: "id" }])
  estadoRifa: EstadosRifa;

  @ManyToOne(() => TiposRifa, (tiposRifa) => tiposRifa.rifas, {
    onDelete: "SET NULL",
  })
  @JoinColumn([{ name: "tipoRifa", referencedColumnName: "id" }])
  tipoRifa: TiposRifa;

  @ManyToOne(() => Usuarios, (usuarios) => usuarios.rifas, {
    onDelete: "SET NULL",
  })
  @JoinColumn([{ name: "usuario", referencedColumnName: "id" }])
  usuario: Usuarios;

  @OneToMany(() => Transacciones, (transacciones) => transacciones.rifa)
  transacciones: Transacciones[];

  @OneToMany(
    () => UsuariosGanadores,
    (usuariosGanadores) => usuariosGanadores.rifa
  )
  usuariosGanadores: UsuariosGanadores[];

  @OneToMany(
    () => UsuariosParticipantes,
    (usuariosParticipantes) => usuariosParticipantes.rifa
  )
  usuariosParticipantes: UsuariosParticipantes[];
}
