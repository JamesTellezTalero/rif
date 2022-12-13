import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Rifas } from "./Rifas";

@Index("id", ["id"], { unique: true })
@Entity("Tipos_Rifa", { schema: "rif" })
export class TiposRifa {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("text", { name: "Name" })
  name: string;

  @Column("text", { name: "Recompenza" })
  recompenza: string;

  @OneToMany(() => Rifas, (rifas) => rifas.tipoRifa2)
  rifas: Rifas[];
}
