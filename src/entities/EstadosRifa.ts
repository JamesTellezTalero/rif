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

  @Column("timestamp without time zone", { name: "createAt", nullable: true })
  createAt: Date | null;

  @Column("timestamp without time zone", { name: "updateAt", nullable: true })
  updateAt: Date | null;

  @Column("timestamp without time zone", { name: "deleteAt", nullable: true })
  deleteAt: Date | null;

  @OneToMany(() => Rifas, (rifas) => rifas.estadoRifa)
  rifas: Rifas[];
}
