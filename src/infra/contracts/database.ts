// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Database<T = any> {
  connect: () => Promise<T>
}
