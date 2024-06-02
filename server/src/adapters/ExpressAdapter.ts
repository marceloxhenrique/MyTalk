import express, { Express, Request, Response } from "express";
import { HttpRequest, HttpResponse, HttpServer, RequestHandler } from "./HttpServer";
import { createServer, Server as HttpServerType } from "node:http";
import cors from "cors";

export default class ExpressAdapter implements HttpServer {
  private app: Express;
  server: HttpServerType;
  constructor() {
    this.app = express();
    this.server = createServer(this.app);
    this.app.use(express.json());
    this.app.use(cors());
  }
  on(method: "post" | "get" | "put" | "delete", url: string, callback: RequestHandler): void {
    this.app[method](url, (req: Request, res: Response) => {
      const httpRequest: HttpRequest = {
        body: req.body,
        params: req.params,
        query: req.query,
      };
      const httpResponse: HttpResponse = {
        status: (statusCode: number) => {
          res.status(statusCode);
          return httpResponse;
        },
        json: function (data: any): HttpResponse {
          res.json(data);
          return httpResponse;
        },
        send: function (data: any): HttpResponse {
          res.send(data);
          return httpResponse;
        },
      };
      callback(httpRequest, httpResponse);
    });
  }

  serverSocket(): HttpServerType {
    return this.server;
  }

  listen(port: number) {
    this.server.listen(port, () => {
      console.log(`Server running in port: http://localhost:${port}`);
    });
  }
}
