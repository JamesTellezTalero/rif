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

  @Column("timestamp without time zone", { name: "createAt" })
  createAt: Date;

  @Column("timestamp without time zone", { name: "updateAt" })
  updateAt: Date;

  @Column("timestamp without time zone", { name: "deleteAt" })
  deleteAt: Date;

  @OneToMany(
    () => Transacciones,
    (transacciones) => transacciones.transactionState
  )
  transacciones: Transacciones[];
}
