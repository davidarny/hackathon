export interface App<T> {
    run(): void;

    cleanup(): void;

    build(): T;
}
