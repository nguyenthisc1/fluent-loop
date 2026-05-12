export interface Controller<Input, Output> {
  handle(input: Input): Promise<Output>;
}
