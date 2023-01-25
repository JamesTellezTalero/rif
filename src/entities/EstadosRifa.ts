import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Rifas } from "./Rifas";

@Entity("EstadosRifa", { schema: "public" })
export class EstadosRifa {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "name" })
  name: string;

  @Column("boolean", { name: "status", default: () => "true" })
  status: boolean;

  @Column("timestamp without time zone", { name: "createAt" })
  createAt: Date;

  @Column("timestamp without time zone", { name: "updateAt" })
  updateAt: Date;

  @Column("timestamp without time zone", { name: "deleteAt" })
  deleteAt: Date;

  @OneToMany(() => Rifas, (rifas) => rifas.estadoRifa)
  rifas: Rifas[];
}
