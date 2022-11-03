import { Column, Entity } from "typeorm";
import { CoreEntity } from "../core/core.entity";

@Entity("roles")
export class Role extends CoreEntity {
  @Column()
  name: string;

  @Column()
  description: string;
}
