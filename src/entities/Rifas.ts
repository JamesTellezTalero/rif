import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Usuarios } from "./Usuarios";
import { TiposRifa } from "./TiposRifa";
import { Transacciones } from "./Transacciones";
import { UsuariosGanadores } from "./UsuariosGanadores";

@Index("id", ["id"], { unique: true })
@Index("Usuario", ["usuario"], {})
@Index("Tipo_rifa", ["tipoRifa"], {})
@Entity("Rifas", { schema: "rif" })
export class Rifas {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "Usuario" })
  usuario: number;

  @Column("text", { name: "Name" })
  name: string;

  @Column("text", { name: "Desc" })
  desc: string;

  @Column("int", { name: "Posibles_ganadores" })
  posiblesGanadores: number;

  @Column("int", { name: "Costo_oportunidad" })
  costoOportunidad: number;

  @Column("text", { name: "Image" })
  image: string;

  @Column("int", { name: "Monto_recaudado" })
  montoRecaudado: number;

  @Column("int", { name: "Participantes_totales" })
  participantesTotales: number;

  @Column("int", { name: "Tipo_rifa" })
  tipoRifa: number;

  @Column("enum", {
    name: "State",
    enum: ["false", "true"],
    default: () => "'true'",
  })
  state: "false" | "true";

  @ManyToOne(() => Usuarios, (usuarios) => usuarios.rifas, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "Usuario", referencedColumnName: "id" }])
  usuario2: Usuarios;

  @ManyToOne(() => TiposRifa, (tiposRifa) => tiposRifa.rifas, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "Tipo_rifa", referencedColumnName: "id" }])
  tipoRifa2: TiposRifa;

  @OneToMany(() => Transacciones, (transacciones) => transacciones.rifa2)
  transacciones: Transacciones[];

  @OneToMany(
    () => UsuariosGanadores,
    (usuariosGanadores) => usuariosGanadores.rifa2
  )
  usuariosGanadores: UsuariosGanadores[];
}
