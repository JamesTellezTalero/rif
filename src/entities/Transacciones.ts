import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TransaccionStates } from "./TransaccionStates";
import { Usuarios } from "./Usuarios";
import { Rifas } from "./Rifas";

@Index("id", ["id"], { unique: true })
@Index("State", ["state"], {})
@Index("Usuario", ["usuario"], {})
@Index("Rifa", ["rifa"], {})
@Entity("Transacciones", { schema: "rif" })
export class Transacciones {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("text", { name: "Orden" })
  orden: string;

  @Column("int", { name: "State" })
  state: number;

  @Column("int", { name: "Rifa" })
  rifa: number;

  @Column("int", { name: "Usuario" })
  usuario: number;

  @Column("int", { name: "Amount" })
  amount: number;

  @ManyToOne(
    () => TransaccionStates,
    (transaccionStates) => transaccionStates.transacciones,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "State", referencedColumnName: "id" }])
  state2: TransaccionStates;

  @ManyToOne(() => Usuarios, (usuarios) => usuarios.transacciones, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "Usuario", referencedColumnName: "id" }])
  usuario2: Usuarios;

  @ManyToOne(() => Rifas, (rifas) => rifas.transacciones, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "Rifa", referencedColumnName: "id" }])
  rifa2: Rifas;
}
