import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Length } from "class-validator";
import { Ad } from "./Ad";

@Entity()
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  @Length(3, 100, {
    message: "Entre 3 et 100 caractères",
  })
  tag!: string;

  @ManyToMany(() => Ad, (ad) => ad.tags_id)
  ads_id!: Ad[];
}
