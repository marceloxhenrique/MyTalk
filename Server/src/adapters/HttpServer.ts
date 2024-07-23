import { ObjectEncodingOptions } from "fs";
import { dirname } from "path";
export interface HttpRequest {
  body?: any;
  params?: any;
  query?: any;
  cookies?: any;
}

export interface HttpResponse {
  status(statusCode: number): this;
  json(data: any): this;
  send(data: any): this;
  sendStatus(data: any): this;
  cookie(name: string, val: string, options: Object): this;
  sendFile(data: any): this;
  clearCookie(token: string, options: Object): this;
}

export type RequestHandler = (req: HttpRequest, res: HttpResponse) => void;

export interface HttpServer {
  on(method: "post" | "get" | "put" | "delete", url: string, callback: RequestHandler): void;
  listen(port: number, callback: () => void): void;
}
