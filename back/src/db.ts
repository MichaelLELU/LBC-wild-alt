import { DataSource } from "typeorm";

export const dataSource = new DataSource({
  type: "sqlite",
  database: "./LBC.sqlite",
  entities: ["src/entities/*.ts"],

  synchronize: false,
  migrations: ["src/migrations/*.ts"],
  migrationsTableName: "migrations",
});
