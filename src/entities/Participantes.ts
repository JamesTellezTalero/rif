import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Participantes", { schema: "public" })
export class Participantes {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "nombre" })
  nombre: string;

  @Column("integer", { name: "tipoDocumento" })
  tipoDocumento: number;

  @Column("character varying", { name: "documento" })
  documento: string;

  @Column("character varying", { name: "telefono" })
  telefono: string;

  @Column("boolean", { name: "status", default: () => "true" })
  status: boolean;

  @Column("timestamp without time zone", { name: "createAt" })
  createAt: Date;

  @Column("timestamp without time zone", { name: "updateAt", nullable: true })
  updateAt: Date | null;

  @Column("timestamp without time zone", { name: "deleteAt", nullable: true })
  deleteAt: Date | null;
}
