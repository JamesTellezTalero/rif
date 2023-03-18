import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Currencies } from "./Currencies";
import { ParticipantesRifa } from "./ParticipantesRifa";
import { PaymentMethods } from "./PaymentMethods";
import { Rifas } from "./Rifas";
import { TransactionStates } from "./TransactionStates";

@Entity("Transacciones", { schema: "public" })
export class Transacciones {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "orden", nullable: true })
  orden: string | null;

  @Column("character varying", { name: "dinamicorden", nullable: true })
  dinamicorden: string | null;

  @Column("character varying", { name: "paymentlink", nullable: true })
  paymentlink: string | null;

  @Column("character varying", { name: "jsonresp", nullable: true })
  jsonresp: string | null;

  @Column("integer", { name: "amount" })
  amount: number;

  @Column("boolean", { name: "status", default: () => "true" })
  status: boolean;

  @Column("timestamp without time zone", { name: "createAt", nullable: true })
  createAt: Date | null;

  @Column("timestamp without time zone", { name: "updateAt", nullable: true })
  updateAt: Date | null;

  @Column("timestamp without time zone", { name: "deleteAt", nullable: true })
  deleteAt: Date | null;

  @ManyToOne(() => Currencies, (currencies) => currencies.transacciones, {
    onDelete: "SET NULL",
  })
  @JoinColumn([{ name: "currency", referencedColumnName: "id" }])
  currency: Currencies;

  @ManyToOne(
    () => ParticipantesRifa,
    (participantesRifa) => participantesRifa.transacciones,
    { onDelete: "SET NULL" }
  )
  @JoinColumn([{ name: "participanterifa", referencedColumnName: "id" }])
  participanterifa: ParticipantesRifa;

  @ManyToOne(
    () => PaymentMethods,
    (paymentMethods) => paymentMethods.transacciones,
    { onDelete: "SET NULL" }
  )
  @JoinColumn([{ name: "paymentmethod", referencedColumnName: "id" }])
  paymentmethod: PaymentMethods;

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
}
