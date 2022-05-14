import "reflect-metadata";
import express = require("express");
import "express-async-errors";

import { Request, Response, NextFunction } from "express";
import { router } from "./routes";
import { AppError } from "@shared/errors/AppError";

import createConnection from "@shared/infra/typeorm";
import swaggerUi = require("swagger-ui-express");
import swaggerFile = require("../../../swagger.json");

import "@shared/container";

createConnection();
const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }
    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
);

export { app };
