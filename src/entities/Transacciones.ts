import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Transacciones", { schema: "public" })
export class Transacciones {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "orden" })
  orden: string;

  @Column("integer", { name: "rifa" })
  rifa: number;

  @Column("integer", { name: "usuario" })
  usuario: number;

  @Column("integer", { name: "amount" })
  amount: number;

  @Column("integer", { name: "transactionState" })
  transactionState: number;

  @Column("boolean", { name: "status", default: () => "true" })
  status: boolean;

  @Column("timestamp without time zone", { name: "createAt" })
  createAt: Date;

  @Column("timestamp without time zone", { name: "updateAt", nullable: true })
  updateAt: Date | null;

  @Column("timestamp without time zone", { name: "deleteAt", nullable: true })
  deleteAt: Date | null;
}
