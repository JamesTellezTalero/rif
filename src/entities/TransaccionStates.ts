import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Transacciones } from "./Transacciones";

@Index("id", ["id"], { unique: true })
@Entity("Transaccion_States", { schema: "rif" })
export class TransaccionStates {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("text", { name: "Name" })
  name: string;

  @Column("enum", {
    name: "State",
    enum: ["false", "true"],
    default: () => "'true'",
  })
  state: "false" | "true";

  @OneToMany(() => Transacciones, (transacciones) => transacciones.state2)
  transacciones: Transacciones[];
}
