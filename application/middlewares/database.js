import mongoose from "mongoose";
import appConfig from "../config/main";

const ENV = process.env.NODE_ENV || "dev";
const config = appConfig.database[ENV];

const DB_PROTOCOL = config.DB_PROTOCOL;
const DB_HOST = config.DB_HOST;
const DB_USER = config.DB_USER;
const DB_PASSWORD = config.DB_PASSWORD;
const DB_DATABASE = config.DB_DATABASE;
const DB_PORT = config.DB_PORT;
const DB_OPTIONS = config.DB_OPTIONS || "";

const connectionString = `${DB_PROTOCOL}${DB_USER}:${DB_PASSWORD}@${DB_HOST}${DB_PORT}/${DB_DATABASE}?${DB_OPTIONS}`;
export default () => {
  mongoose
    .connect(connectionString, { useCreateIndex: true, useNewUrlParser: true })
    .then(() => {
      console.log(`MongoDB Conectado: ${ENV}`);
    })
    .catch(err => {
      console.log(err);
    });
};
