import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Length } from "class-validator";
import { Ad } from "./Ad";

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  @Length(3, 100, {
    message: "Entre 3 et 100 caractères",
  })
  name!: string;

  @OneToMany(() => Ad, (ad) => ad.category_id)
  ads!: Ad[];
}
