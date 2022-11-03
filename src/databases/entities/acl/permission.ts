import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { CoreEntity } from "../core/core.entity";
import { Module } from "./module";

@Entity("permissions")
export class Permission extends CoreEntity {
  @Column()
  name!: string;

  @Column()
  description: string;

  @Column({ name: "module_id" })
  moduleId: number;

  @ManyToOne(() => Module, (module) => module.id)
  @JoinColumn({ name: "module_id" })
  module: Module;
}
