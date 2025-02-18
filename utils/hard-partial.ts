export type HardPartial<T> = { [P in keyof T]?: T[P] | undefined };
