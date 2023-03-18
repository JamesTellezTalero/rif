import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PaymentMethodKeys } from "./PaymentMethodKeys";
import { Transacciones } from "./Transacciones";

@Entity("PaymentMethods", { schema: "public" })
export class PaymentMethods {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "name" })
  name: string;

  @Column("character varying", { name: "url" })
  url: string;

  @Column("boolean", { name: "status", default: () => "true" })
  status: boolean;

  @Column("timestamp without time zone", { name: "createAt", nullable: true })
  createAt: Date | null;

  @Column("timestamp without time zone", { name: "updateAt", nullable: true })
  updateAt: Date | null;

  @Column("timestamp without time zone", { name: "deleteAt", nullable: true })
  deleteAt: Date | null;

  @OneToMany(
    () => PaymentMethodKeys,
    (paymentMethodKeys) => paymentMethodKeys.paymentMethod
  )
  paymentMethodKeys: PaymentMethodKeys[];

  @OneToMany(
    () => Transacciones,
    (transacciones) => transacciones.paymentmethod
  )
  transacciones: Transacciones[];
}
