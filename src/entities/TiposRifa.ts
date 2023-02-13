import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Rifas } from "./Rifas";

@Entity("TiposRifa", { schema: "public" })
export class TiposRifa {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "name" })
  name: string;

  @Column("character varying", { name: "recompenza" })
  recompenza: string;

  @Column("boolean", { name: "status", default: () => "true" })
  status: boolean;

  @Column("timestamp without time zone", { name: "createAt" })
  createAt: Date;

  @Column("timestamp without time zone", { name: "updateAt", nullable: true })
  updateAt: Date | null;

  @Column("timestamp without time zone", { name: "deleteAt", nullable: true })
  deleteAt: Date | null;

  @OneToMany(() => Rifas, (rifas) => rifas.tipoRifa)
  rifas: Rifas[];
}
