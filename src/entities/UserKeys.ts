import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PaymentMethodKeys } from "./PaymentMethodKeys";

@Entity("UserKeys", { schema: "public" })
export class UserKeys {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "value" })
  value: string;

  @Column("boolean", { name: "status", default: () => "true" })
  status: boolean;

  @Column("timestamp without time zone", { name: "createAt", nullable: true })
  createAt: Date | null;

  @Column("timestamp without time zone", { name: "updateAt", nullable: true })
  updateAt: Date | null;

  @Column("timestamp without time zone", { name: "deleteAt", nullable: true })
  deleteAt: Date | null;

  @ManyToOne(
    () => PaymentMethodKeys,
    (paymentMethodKeys) => paymentMethodKeys.userKeys,
    { onDelete: "SET NULL" }
  )
  @JoinColumn([{ name: "key", referencedColumnName: "id" }])
  key: PaymentMethodKeys;
}
