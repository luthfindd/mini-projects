import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import { AuthController } from "./controllers/auth.controller";


const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Auth API",
      version: "1.0.0",
      description: "API documentation for authentication endpoints",
    },
    servers: [
      {
        url: "http://localhost:8000", // Ganti dengan URL server Anda
      },
    ],
  },
  apis: ["./controllers/*.ts"], // Path ke file controller
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};