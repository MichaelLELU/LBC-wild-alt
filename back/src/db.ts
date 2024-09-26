import { DataSource } from "typeorm";

export const dataSource = new DataSource({
  type: "sqlite",
  database: "./newLBC.sqlite",
  entities: ["src/entities/*.ts"],
  synchronize: true,
});
