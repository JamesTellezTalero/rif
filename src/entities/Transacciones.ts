import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Rifas } from "./Rifas";
import { TransactionStates } from "./TransactionStates";
import { Usuarios } from "./Usuarios";

@Entity("Transacciones", { schema: "public" })
export class Transacciones {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "orden" })
  orden: string;

  @Column("integer", { name: "amount" })
  amount: number;

  @Column("boolean", { name: "status", default: () => "true" })
  status: boolean;

  @Column("timestamp without time zone", { name: "createAt" })
  createAt: Date;

  @Column("timestamp without time zone", { name: "updateAt", nullable: true })
  updateAt: Date | null;

  @Column("timestamp without time zone", { name: "deleteAt", nullable: true })
  deleteAt: Date | null;

  @ManyToOne(() => Rifas, (rifas) => rifas.transacciones, {
    onDelete: "SET NULL",
  })
  @JoinColumn([{ name: "rifa", referencedColumnName: "id" }])
  rifa: Rifas;

  @ManyToOne(
    () => TransactionStates,
    (transactionStates) => transactionStates.transacciones,
    { onDelete: "SET NULL" }
  )
  @JoinColumn([{ name: "transactionState", referencedColumnName: "id" }])
  transactionState: TransactionStates;

  @ManyToOne(() => Usuarios, (usuarios) => usuarios.transacciones, {
    onDelete: "SET NULL",
  })
  @JoinColumn([{ name: "usuario", referencedColumnName: "id" }])
  usuario: Usuarios;
}
