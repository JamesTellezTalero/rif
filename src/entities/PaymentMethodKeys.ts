import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PaymentMethods } from "./PaymentMethods";
import { UserKeys } from "./UserKeys";

@Entity("PaymentMethodKeys", { schema: "public" })
export class PaymentMethodKeys {
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

  @ManyToOne(
    () => PaymentMethods,
    (paymentMethods) => paymentMethods.paymentMethodKeys,
    { onDelete: "SET NULL" }
  )
  @JoinColumn([{ name: "paymentMethod", referencedColumnName: "id" }])
  paymentMethod: PaymentMethods;

  @OneToMany(() => UserKeys, (userKeys) => userKeys.key)
  userKeys: UserKeys[];
}
