export interface UseCase {
  run(context: {
    input: { [key: string]: string };
    params: { [key: string]: string };
  }): Promise<any>;
}
