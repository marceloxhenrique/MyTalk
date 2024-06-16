export default interface Connection {
  query(statements: string, params: any): Promise<any>;
  one(statements: string, params: any): Promise<any>;
  close(): Promise<void>;
}
