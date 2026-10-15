declare const __VERSION__: string

declare module '*?worker&inline' {
  const WorkerConstructor: {
    new (): Worker
  }

  export default WorkerConstructor
}
