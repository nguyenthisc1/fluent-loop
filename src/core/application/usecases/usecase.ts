export interface UseCase<Input, Output> {
  execute(input: Input): Promise<Output>;
}

export interface NoInputUseCase<Output> {
  execute(): Promise<Output>;
}
