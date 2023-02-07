import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

const connectDB = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
  password: process.env.DB_PASSWORD,
  username: process.env.DB_USER,
  database: process.env.DB_NAME,
  logging: false,
  synchronize: false,
  entities: ["./src/entities/**/*.ts"],
  migrations: ['./migrations/**/*.ts'],
});

connectDB
  .initialize()
  .then(() => {
    console.log(`Data Source has been initialized`);
  })
  .catch((err) => {
    console.error(`Data Source initialization error`, err);
  });

export default connectDB;
