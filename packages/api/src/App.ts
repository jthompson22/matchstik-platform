import express, { Application } from "express";
import { ApolloServer } from "apollo-server-express";
import compression from "compression";
import { json } from "body-parser";
import { connect } from "mongoose";
import authenticate from "./util/middleware/authenticate";
import cors from "./util/middleware/cors";
import { executableSchema as schema } from "./graphql/schema";
import { graphqlUploadExpress } from "graphql-upload";
import { MONGO_DB_HOST, MONGO_DB_PORT } from "./env";

export default class App {
  public app: Application;
  public port: number;

  constructor(port) {
    this.app = express();
    this.port = port;

    this.connectToMongo();
    this.initializeMiddlewares();
    this.initializeApollo();
  }

  connectToMongo() {
    connect(`mongodb://${MONGO_DB_HOST}:${MONGO_DB_PORT}/admin`, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
      .then(() => {
        console.log("Connected to MongoDB...");
      })
      .catch((e) => {
        console.error("There was an error connecting to MongoDB:");
        console.error(e);
      });
  }

  private initializeMiddlewares() {
    this.app.use(compression());
    this.app.use(cors);
    this.app.use(json());
    this.app.use(authenticate);
    this.app.use(graphqlUploadExpress());
  }

  private initializeApollo() {
    const server = new ApolloServer({
      uploads: false,
      schema,
      context: (req) => ({
        req: req.req,
        res: req.res,
      }),
    });

    this.app.get("/", (_, res) => {
      res.status(200).send("OK");
    });

    server.applyMiddleware({ app: this.app });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}
