import { Column, Entity } from "typeorm";
import { CoreEntity } from "../core/core.entity";

@Entity("modules")
export class Module extends CoreEntity {
  @Column()
  name!: string;

  @Column()
  description: string;
}
