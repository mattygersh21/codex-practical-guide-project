declare module "bun:sqlite" {
  export class Database {
    constructor(filename?: string);
    exec(query: string): void;
    prepare<T extends Record<string, unknown> = Record<string, unknown>>(
      query: string,
    ): {
      all(): T[];
    };
    run(query: string, ...params: unknown[]): void;
    transaction<T extends (...args: unknown[]) => unknown>(callback: T): T;
    close(): void;
  }
}
