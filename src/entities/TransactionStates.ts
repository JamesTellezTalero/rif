import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Transacciones } from "./Transacciones";

@Entity("TransactionStates", { schema: "public" })
export class TransactionStates {
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

  @OneToMany(
    () => Transacciones,
    (transacciones) => transacciones.transactionState
  )
  transacciones: Transacciones[];
}
