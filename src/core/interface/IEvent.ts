export interface IEvent {
  name: string
  execute: (...args: any[]) => void
}
