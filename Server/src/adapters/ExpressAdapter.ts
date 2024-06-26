import express, { Express, Request, Response } from "express";
import { HttpRequest, HttpResponse, HttpServer, RequestHandler } from "./HttpServer";
import { createServer, Server as HttpServerType } from "node:http";
import cookieParser from "cookie-parser";
import { CookieOptions } from "express";
import cors from "cors";
const FRONT_END_URL = process.env.FRONT_END_URL;
export default class ExpressAdapter implements HttpServer {
  private app: Express;
  server: HttpServerType;
  constructor() {
    this.app = express();
    this.server = createServer(this.app);
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(
      cors({
        origin: FRONT_END_URL ?? "http://localhost:5173",
        optionsSuccessStatus: 200,
        credentials: true,
      })
    );
  }
  on(method: "post" | "get" | "put" | "delete", url: string, callback: RequestHandler): void {
    this.app[method](url, (req: Request, res: Response) => {
      const httpRequest: HttpRequest = {
        body: req.body,
        params: req.params,
        query: req.query,
        cookies: req.cookies,
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
        send: function (data): HttpResponse {
          res.send(data);
          return httpResponse;
        },
        cookie: function (name: string, val: string, options: CookieOptions): HttpResponse {
          res.cookie(name, val, options);
          return httpResponse;
        },
        sendFile: function (data: any): HttpResponse {
          res.sendFile(data);
          return httpResponse;
        },
        clearCookie: function (token: string, options: CookieOptions): HttpResponse {
          res.clearCookie(token);
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
