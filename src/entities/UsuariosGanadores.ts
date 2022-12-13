import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Rifas } from "./Rifas";
import { Usuarios } from "./Usuarios";

@Index("id", ["id"], { unique: true })
@Index("Rifa", ["rifa"], {})
@Index("Usuario", ["usuario"], {})
@Entity("Usuarios_Ganadores", { schema: "rif" })
export class UsuariosGanadores {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "Rifa" })
  rifa: number;

  @Column("int", { name: "Usuario" })
  usuario: number;

  @ManyToOne(() => Rifas, (rifas) => rifas.usuariosGanadores, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "Rifa", referencedColumnName: "id" }])
  rifa2: Rifas;

  @ManyToOne(() => Usuarios, (usuarios) => usuarios.usuariosGanadores, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "Usuario", referencedColumnName: "id" }])
  usuario2: Usuarios;
}
