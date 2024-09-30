import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  ManyToMany,
} from "typeorm";
import { Length } from "class-validator";
import { Category } from "./Category";
import { Tag } from "./Tag";

@Entity()
export class Ad extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  @Length(3, 100, {
    message: "Entre 3 et 100 caractères",
  })
  title!: string;

  @Column({ length: 500 })
  @Length(10, 500, {
    message: "Entre 10 et 500 caractères",
  })
  description!: string;

  @Column({ length: 100 })
  @Length(3, 100, {
    message: "Entre 3 et 100 caractères",
  })
  owner!: string;

  @Column()
  price!: number;

  @Column()
  picture!: string;

  @Column({ length: 100 })
  @Length(3, 100, {
    message: "Entre 3 et 100 caractères",
  })
  location!: string;

  @ManyToOne(() => Category, (category) => category.ads)
  category_id!: Category;

  @ManyToMany(() => Tag, (tag) => tag.ads_id)
  tags_id!: Tag[];
}
