export interface HttpRequest {
  body?: any;
  params?: any;
  query?: any;
}

export interface HttpResponse {
  status(statusCode: number): this;
  json(data: any): this;
  send(data: any): this;
}

export type RequestHandler = (req: HttpRequest, res: HttpResponse) => void;

export interface HttpServer {
  on(method: "post" | "get" | "put" | "delete", url: string, callback: RequestHandler): void;
  listen(port: number, callback: () => void): void;
}